"use client"

import { useEffect, useRef } from "react"
import { useCart } from "./useCart"

export default function ClearCartOnSuccess({
  enabled,
}: {
  enabled: boolean
}) {
  const { clear } = useCart()
  const did = useRef(false)

  useEffect(() => {
    if (!enabled || did.current) return
    did.current = true
    clear()
    try {
      localStorage.removeItem("sg_checkout_draft")
    } catch {
      // ignore
    }
  }, [enabled, clear])

  return null
}
