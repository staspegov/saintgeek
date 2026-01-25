import { NextResponse } from "next/server";
import { getDB, admin } from "@/lib/firebaseAdmin";
import crypto from "crypto";

export const runtime = "nodejs";

type IncomingItem = { productId: string; qty: number };

export async function POST(req: Request) {
  try {
    const db = getDB();
    const body = (await req.json()) as {
      items: IncomingItem[];
      customer?: { email?: string; name?: string; phone?: string };
    };

    if (!body?.items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const map = new Map<string, number>();
    for (const it of body.items) {
      const q = Math.max(1, Math.min(99, Number(it.qty || 1)));
      map.set(it.productId, (map.get(it.productId) ?? 0) + q);
    }

    const productIds = Array.from(map.keys());
    const snaps = await Promise.all(productIds.map((id) => db.collection("products").doc(id).get()));

    const items: any[] = [];
    let subtotal = 0;

    for (const snap of snaps) {
      if (!snap.exists) return NextResponse.json({ error: "Product not found" }, { status: 400 });

      const p = snap.data() as any;
      if (!p.active) return NextResponse.json({ error: "Product inactive" }, { status: 400 });

      const qty = map.get(snap.id)!;

      if (typeof p.stock === "number" && p.stock < qty) {
        return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
      }

      const unitPrice = Number(p.price ?? 0);
      const lineTotal = unitPrice * qty;
      subtotal += lineTotal;

      items.push({
        productId: snap.id,
        sku: p.sku ?? null,
        slug: p.slug ?? null,
        name: p.name ?? "Producto",
        image: p.images?.[0] ?? null,
        unitPrice,
        qty,
        lineTotal,
      });
    }

    const shipping = 0;
    const discount = 0;
    const total = subtotal + shipping - discount;

    const orderId = crypto.randomUUID();

    await db.collection("orders").doc(orderId).set({
      status: "created",
      status_detail: null,
      currency: "CLP",
      amounts: { subtotal, shipping, discount, total },
      customer: {
        email: body.customer?.email ?? null,
        name: body.customer?.name ?? null,
        phone: body.customer?.phone ?? null,
      },
      items,
      shipping: { required: false, method: null, address: null, cost: shipping },
      mp: { paymentId: null, status: null, statusDetail: null, paymentMethodId: null, installments: null },
      metadata: {
        channel: "web",
        env: process.env.MP_ACCESS_TOKEN?.startsWith("TEST-") ? "test" : "prod",
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ orderId, total });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Order create failed" }, { status: 500 });
  }
}
