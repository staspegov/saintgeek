import { NextResponse } from "next/server";
import { getDB } from "@/lib/firebaseAdmin";

export async function GET(_: Request, { params }: { params: { orderId: string } }) {
  const db = getDB();
  const snap = await db.collection("orders").doc(params.orderId).get();
  if (!snap.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ orderId: snap.id, ...snap.data() });
}