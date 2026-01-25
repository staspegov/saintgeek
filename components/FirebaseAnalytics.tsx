"use client";

import { useEffect } from "react";
import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "@/lib/firebaseClient";

export default function FirebaseAnalytics() {
  useEffect(() => {
    (async () => {
      const ok = await isSupported();
      if (ok) getAnalytics(app);
    })();
  }, []);

  return null;
}
