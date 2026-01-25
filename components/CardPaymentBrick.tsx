"use client"

import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { loadMercadoPago } from "@mercadopago/sdk-js";

export type CardPaymentBrickHandle = {
  unmount: () => Promise<void>;
};

type Props = {
  amount: number;
  description: string;
  payerEmail?: string;
  metadata?: Record<string, any>;

  /**
   * If your backend returns { orderId }, this component can redirect to:
   * /checkout/success?orderId=...
   */
  redirectOnResponse?: boolean;

  /**
   * Optional callback to observe the payment response.
   */
  onResult?: (r: {
    id: number | string;
    status?: string;
    status_detail?: string;
    orderId?: string;
  }) => void;
};

type BrickError = { message?: string; cause?: string; type?: string };

const CardPaymentBrick = forwardRef<CardPaymentBrickHandle, Props>(function CardPaymentBrick(
  { amount, description, payerEmail, metadata, redirectOnResponse = true, onResult },
  ref
) {
  const router = useRouter();

  const rid = useId();
  const containerId = useMemo(() => `mp_card_${rid.replace(/[:]/g, "")}`, [rid]);

  const controllerRef = useRef<any>(null);
  const initSeqRef = useRef(0);

  // Keep latest props in a ref to avoid re-creating the brick for prop changes
  const latestRef = useRef({ amount, description, payerEmail, metadata });
  useEffect(() => {
    latestRef.current = { amount, description, payerEmail, metadata };
  }, [amount, description, payerEmail, metadata]);

  const [uiError, setUiError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [processingMsg, setProcessingMsg] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  async function safeUnmount() {
    try {
      const c = controllerRef.current;
      controllerRef.current = null;
      if (c?.unmount) await c.unmount();
    } catch {
      // best-effort
    }
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = "";
  }

  useImperativeHandle(ref, () => ({ unmount: safeUnmount }), [containerId]);

  useEffect(() => {
    let cancelled = false;
    const mySeq = ++initSeqRef.current;

    (async () => {
      setUiError(null);
      setReady(false);
      setProcessingMsg(null);
      setResult(null);

      const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
      if (!publicKey) {
        setUiError("Falta NEXT_PUBLIC_MP_PUBLIC_KEY");
        return;
      }

      await loadMercadoPago();
      if (cancelled || mySeq !== initSeqRef.current) return;

      const MP = (window as any).MercadoPago;
      if (!MP) {
        setUiError("MercadoPago SDK no cargó (window.MercadoPago).");
        return;
      }

      const el = document.getElementById(containerId);
      if (!el) {
        setUiError("No se encontró el contenedor del Brick en el DOM.");
        return;
      }

      // Clean previous instances (React StrictMode in dev can mount/unmount twice)
      await safeUnmount();
      if (cancelled || mySeq !== initSeqRef.current) return;

      const mp = new MP(publicKey, { locale: "es-CL" });
      const bricksBuilder = mp.bricks();

      const controller = await bricksBuilder.create("cardPayment", containerId, {
        initialization: { amount },
        callbacks: {
          onReady: () => {
            if (cancelled) return;
            setReady(true);
          },

          onSubmit: async (cardFormData: any) => {
            setUiError(null);
            setProcessingMsg("Procesando pago…");

            const { amount, description, payerEmail, metadata } = latestRef.current;

            const payload = {
              ...cardFormData,
              transaction_amount: amount,
              description,
              payer: {
                ...(cardFormData?.payer ?? {}),
                email: payerEmail ?? cardFormData?.payer?.email,
              },
              metadata: metadata ?? {},
            };

            const res = await fetch("/api/mp/process-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            const json = await res.json().catch(() => ({}));

            if (!res.ok) {
              const msg = json?.error ?? "No se pudo crear el pago.";
              setProcessingMsg(null);
              setUiError(msg);
              throw new Error(msg);
            }

            setProcessingMsg(null);
            setResult(json);

            onResult?.({
              id: json.id,
              status: json.status,
              status_detail: json.status_detail,
              orderId: json.orderId,
            });

            // PRO FLOW: redirect to a success/confirmation page (orderId is the key)
            // Your backend must return { orderId }.
            if (redirectOnResponse && json?.orderId) {
              router.push(`/checkout/success?orderId=${encodeURIComponent(json.orderId)}`);
            }

            // IMPORTANT: return the JSON back to the Brick
            return json;
          },

          onError: (err: BrickError) => {
            const msg = String(err?.message ?? "");

            // Common DOM teardown noise (don’t show to user)
            if (msg.includes("removeChild")) return;

            if (err?.cause === "secure_fields_card_token_creation_failed") {
              setUiError(
                "No se pudo tokenizar la tarjeta. En TEST usa tarjetas oficiales + comprador de prueba. Prueba sin AdBlock/extensiones y revisa CSP (frame-src)."
              );
              return;
            }

            setUiError(msg || "Error en Mercado Pago.");
          },
        },
      });

      if (cancelled || mySeq !== initSeqRef.current) {
        try {
          await controller?.unmount?.();
        } catch {}
        return;
      }

      controllerRef.current = controller;
    })().catch((e: any) => {
      if (cancelled) return;
      setUiError(e?.message ?? "Error inicializando Mercado Pago.");
    });

    return () => {
      cancelled = true;
      safeUnmount();
    };
  }, [containerId, redirectOnResponse, router]); // do NOT include amount/metadata/description here

  return (
    <div>
      {uiError && (
        <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {uiError}
        </div>
      )}

      {!ready && !uiError && (
        <div className="mb-3 text-sm text-[#a9abb0]">Cargando checkout seguro…</div>
      )}

      <div id={containerId} className="rounded-xl bg-white p-4" />

      {processingMsg && (
        <div className="mt-3 rounded-lg bg-white/5 p-3 text-sm text-white">{processingMsg}</div>
      )}

      {/* Optional (mainly useful in local dev if you disable redirectOnResponse) */}
      {result?.status && !redirectOnResponse && (
        <div className="mt-3 rounded-lg bg-white/5 p-3 text-sm text-white">
          <div className="font-semibold">
            {result.status === "approved"
              ? "Pago aprobado"
              : result.status === "in_process"
              ? "Pago en revisión"
              : result.status === "pending"
              ? "Pago pendiente"
              : "Pago rechazado"}
          </div>
          <div className="mt-1 text-white/70">
            ID: {result.id} {result.status_detail ? `· ${result.status_detail}` : ""}
          </div>
        </div>
      )}
    </div>
  );
});

export default CardPaymentBrick;
