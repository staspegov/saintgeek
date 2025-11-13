"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GAProvider({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!(window as any).gtag) return;
    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname || "/";
    (window as any).gtag("config", gaId, { page_path });
  }, [gaId, pathname, searchParams]);

  return null;
}
