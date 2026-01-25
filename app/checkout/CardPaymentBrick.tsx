// cardpaymentbrick.tsx 

"use client";

import { useEffect, useRef, useState } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";

type Props = {
  amount: number;
  description: string;
  metadata?: Record<string, any>; // NEW
};

export default function CardPaymentBrick({ amount, description, metadata }: Props) {
  const containerId = "cardPaymentBrick_container";
  const controllerRef = useRef<any>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const pk = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
      if (!pk) {
        setStatus("Falta NEXT_PUBLIC_MP_PUBLIC_KEY");
        return;
      }

      await loadMercadoPago();
      const mp = new (window as any).MercadoPago(pk, { locale: "es-CL" });
      const bricksBuilder = mp.bricks();

      const settings = {
        initialization: { amount },
        customization: {
          visual: { style: { theme: "default" } },
        },
        callbacks: {
          onSubmit: (cardFormData: any) => {
            setStatus("Procesando pago...");

            const payload = {
              ...cardFormData,
              transaction_amount: amount,
              description,
              metadata: metadata ?? {}, // NEW
            };

            return fetch("/api/mp/process-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
              .then((r) => r.json())
              .then((res) => {
                if (res?.status) {
                  setStatus(`Resultado: ${res.status} (${res.status_detail ?? ""}) - ID: ${res.id}`);
                } else {
                  setStatus(`Error: ${res?.error ?? "Pago no pudo procesarse"}`);
                }
              })
              .catch(() => setStatus("Error procesando el pago"));
          },
          onReady: () => {
            if (!cancelled) setStatus("");
          },
          onError: (error: any) => {
            setStatus("Error en el formulario de pago");
            console.error(error);
          },
        },
      };

      if (controllerRef.current?.unmount) await controllerRef.current.unmount();
      controllerRef.current = await bricksBuilder.create("cardPayment", containerId, settings);
    }

    init();

    return () => {
      cancelled = true;
      if (controllerRef.current?.unmount) controllerRef.current.unmount();
    };
  }, [amount, description, metadata]);

  return (
    <div className="w-full">
      <div id={containerId} />
      {status ? (
        <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-800">
          {status}
        </div>
      ) : null}
    </div>
  );
}
