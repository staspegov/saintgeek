

import Link from "next/link"
import * as React from "react"

type AProps = React.ComponentProps<"a"> & { href?: string }

function A(props: AProps) {
  const { href = "#", children, className = "", ...rest } = props
  const isInternal = href.startsWith("/")
  if (isInternal) {
    // Next.js <Link> for internal routes
    return (
      <Link
        href={href}
        className={`no-underline border-b border-dotted border-[var(--brand,#89ff00)] hover:border-solid hover:text-lime-300 ${className}`}
        {...(rest as any)}
      >
        {children}
      </Link>
    )
  }
  // External link as <a>
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`no-underline border-b border-dotted border-[var(--brand,#89ff00)] hover:border-solid hover:text-lime-300 ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export const MDXComponents = {
  a: A,
  img: (props: React.ComponentProps<"img">) => (
    <img {...props} className={`rounded-xl border border-zinc-800 mx-auto my-4 ${props.className ?? ""}`} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-zinc-800">
      <table className="min-w-[640px]" {...props} />
    </div>
  ),
  Note: (props: { children: React.ReactNode }) => (
    <div className="my-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
      <div className="mb-1 text-sm font-medium text-zinc-400">Nota</div>
      <div>{props.children}</div>
    </div>
  ),
}
