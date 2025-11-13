// components/mdx-components.tsx  (sin "use client")
import Link from "next/link"
import * as React from "react"

type AProps = React.ComponentProps<"a"> & { href?: string }

function A({ href = "#", children, className = "", ...rest }: AProps) {
  const isInternal = href.startsWith("/")
  if (isInternal) {
    return (
      <Link
        href={href}
        className={`no-underline border-b border-dotted border-[var(--brand,#C0FF03)] hover:border-solid hover:text-lime-300 ${className}`}
        {...(rest as any)}
      >
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`no-underline border-b border-dotted border-[var(--brand,#C0FF03)] hover:border-solid hover:text-lime-300 ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

// <img> simple
const Img = (props: React.ComponentProps<"img">) => (
  <img
    {...props}
    className={`rounded-xl border border-zinc-800 mx-auto my-4 ${props.className ?? ""}`}
  />
)

// Tabla con wrapper responsive
const Table = (props: React.ComponentProps<"table">) => (
  <div className="my-6 overflow-x-auto rounded-xl border border-zinc-800">
    <table className="min-w-[640px]" {...props} />
  </div>
)

// *** PRE responsive para bloques de código ***
const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => (
  <pre
    {...props}
    className={`max-w-full overflow-x-auto whitespace-pre-wrap sm:whitespace-pre rounded-xl border border-zinc-800 bg-zinc-950 p-4 ${props.className ?? ""}`}
  />
)

const Note = (props: { children: React.ReactNode }) => (
  <div className="my-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
    <div className="mb-1 text-sm font-medium text-zinc-400">Nota</div>
    <div>{props.children}</div>
  </div>
)

// Exporta el mapping server-safe
export const mdxComponents = {
  a: A,
  img: Img,
  table: Table,
  pre: Pre,        // 👈 importante
  Note,
}

// (si antes importabas MDXComponents, también puedes re-exportar)
// export { mdxComponents as MDXComponents }
