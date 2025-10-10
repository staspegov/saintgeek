// Simple static HTML generator matching the provided inline CSS design.
// It creates /out-static/index.html and per-product HTML pages with the same look.

import { products } from '@/data/products'
import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'out-static')
fs.rmSync(root, { recursive: true, force: true })
fs.mkdirSync(root, { recursive: true })

const baseHead = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Teclados gamer — Vitrina</title>
</head>`

const hero = `
  <!-- Page container -->
  <div style="max-width:1200px;margin:0 auto;padding:40px 24px 80px;">

    <!-- Header / Hero -->
    <div style="padding:8px 0 24px;">
      <h1 style="margin:0 0 12px;font-size:46px;line-height:1.1;letter-spacing:.2px;color:#f4f4f5;">
        Teclados mecánicos gamer
      </h1>
      <p style="max-width:860px;margin:0 0 18px;color:#b6b6b8;font-size:16px;line-height:1.6;">
        Los teclados gamer son periféricos de computadora especiales creados para quienes disfrutan de los videojuegos.
        A diferencia de un modelo de oficina estándar, este dispositivo ofrece una experiencia más placentera gracias a su atractivo diseño,
        comodidad de uso y funciones adicionales.
      </p>
      <a href="#more" style="display:inline-block;background:#89ff00;color:#101010;text-decoration:none;padding:10px 16px;border-radius:999px;font-weight:600;font-size:14px;box-shadow:0 8px 24px rgba(137,255,0,.25);">
        Saber más
      </a>
    </div>
`

function card(p: typeof products[number]) {
  return `
  <article style="background:linear-gradient(180deg,#141416,#0f0f10);border:1px solid #1a1a1c;border-radius:18px;padding:16px;box-shadow:0 10px 28px rgba(0,0,0,.45);position:relative;overflow:hidden;">
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#9ea0a6;">
      <span style="width:8px;height:8px;border-radius:50%;background:${p.status==='in_stock'?'#75ff00':'#ffb02e'};display:inline-block;box-shadow:0 0 0 2px ${p.status==='in_stock'?'rgba(117,255,0,.15)':'rgba(255,176,46,.12)'};"></span>
      ${p.status==='in_stock'?'En stock':'Por pedido'}
    </div>
    <div style="height:160px;margin:14px 0 16px;border-radius:14px;background:
      radial-gradient(120px 80px at 50% 0%, rgba(137,255,0,.18), rgba(137,255,0,0) 60%),
      linear-gradient(180deg,#1a1b1e 0%,#101113 100%);
      display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 360 100" width="88%" height="70%" style="opacity:.92">
        <rect x="8" y="20" width="344" height="60" rx="10" fill="#0d0e10" />
        <g>
          <rect x="20" y="30" width="320" height="14" rx="3" fill="#e9e9ea"/>
          <rect x="20" y="48" width="280" height="14" rx="3" fill="#e9e9ea"/>
          <rect x="20" y="66" width="220" height="14" rx="3" fill="#e9e9ea"/>
        </g>
      </svg>
    </div>
    <div style="font-size:13px;color:#a9abb0;margin:0 0 4px;">${p.subtitle || p.brand}</div>
    <h3 style="margin:0 0 8px;font-size:16px;line-height:1.35;color:#f3f3f4;">${p.name}</h3>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;">
      <div>
        <div style="font-weight:800;font-size:18px;color:#ffffff;">${p.priceRub.toLocaleString('es-CL')} ₽</div>
        <div style="font-size:12px;color:#8d8f95;margin-top:2px;">desde ${p.monthlyRub.toLocaleString('es-CL')} ₽/mes</div>
      </div>
      <a href="./products/${p.slug}.html" style="display:inline-flex;align-items:center;gap:8px;background:#89ff00;color:#121313;text-decoration:none;padding:10px 14px;border-radius:12px;font-weight:700;font-size:13px;box-shadow:0 8px 22px rgba(137,255,0,.25);">Comprar</a>
    </div>
  </article>`
}

const indexHtml = `${baseHead}
<body style="margin:0;background:#0e0e0f;color:#e9e9ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,'Noto Sans',sans-serif;">
  ${hero}
  <div style="display:flex;gap:24px;align-items:flex-start;">
    <aside aria-label="Filtros" style="flex:0 0 270px;border:1px solid #1a1a1c;background:#0f0f11;border-radius:16px;padding:14px 12px;">
      <div style="display:flex;align-items:center;gap:8px;padding:8px 8px 14px 8px;border-bottom:1px solid #1a1a1c;">
        <svg width="18" height="18" viewBox="0 0 24 24" style="opacity:.8"><path fill="#b6b6b8" d="M3 6h18v2H3V6zm4 5h10v2H7v-2zm3 5h4v2h-4v-2z"/></svg>
        <div style="font-weight:700;color:#f0f0f1;">Filtros</div>
      </div>
    </aside>

    <section style="flex:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;">
      ${products.map(p => card(p)).join('\n')}
    </section>
  </div>
</div>
</body></html>`

fs.writeFileSync(path.join(root, 'index.html'), indexHtml, 'utf8')

// Product pages
const prodDir = path.join(root, 'products')
fs.mkdirSync(prodDir, { recursive: true })

for (const p of products) {
  const html = `${baseHead}
  <body style="margin:0;background:#0e0e0f;color:#e9e9ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,'Noto Sans',sans-serif;">
    <div style="max-width:1200px;margin:0 auto;padding:40px 24px 80px;">
      <a href="../index.html" style="color:#a9abb0;text-decoration:none;">← Volver</a>
      <h1 style="color:#f4f4f5;">${p.name}</h1>
      <p style="color:#b6b6b8;">${p.brand}</p>
      <p><strong style="color:#fff;">${p.priceRub.toLocaleString('es-CL')} ₽</strong> <span style="color:#8d8f95;">desde ${p.monthlyRub.toLocaleString('es-CL')} ₽/mes</span></p>
      <a href="${p.mercadoLibreUrl || '#'}" rel="sponsored nofollow" style="display:inline-block;background:#89ff00;color:#121313;text-decoration:none;padding:10px 14px;border-radius:12px;font-weight:700;font-size:13px;box-shadow:0 8px 22px rgba(137,255,0,.25);">Comprar en MercadoLibre</a>
    </div>
  </body></html>`
  fs.writeFileSync(path.join(prodDir, `${p.slug}.html`), html, 'utf8')
}

console.log('Static HTML generated at /out-static')
