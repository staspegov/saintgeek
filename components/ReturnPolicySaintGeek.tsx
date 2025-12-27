"use client"

export default function ReturnPolicySaintGeek() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-14">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Política de Cambios y Devoluciones
        </h1>
        <p className="mt-3 text-sm md:text-base text-[#a9abb0] max-w-3xl">
          En SaintGeek vendemos productos tecnológicos especializados como
          teclados mecánicos y accesorios. Esta política define de forma clara
          cuándo aplica un cambio, devolución o garantía.
        </p>
      </header>

      {/* Cards */}
      <div className="space-y-6">
        {/* Retracto */}
        <div className="rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-6">
          <h2 className="text-lg font-medium text-white mb-2">
            Derecho a Retracto
          </h2>
          <p className="text-sm text-[#a9abb0] leading-relaxed">
            De acuerdo con la Ley N°19.496, SaintGeek informa previamente que
            <strong className="text-white"> no ofrece derecho a retracto </strong>
            en compras online, salvo en los casos obligatorios establecidos por
            la ley.
          </p>
        </div>

        {/* Cambios */}
        <div className="rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-6">
          <h2 className="text-lg font-medium text-white mb-3">
            Cambios de Productos
          </h2>
          <ul className="text-sm text-[#a9abb0] space-y-2 list-disc pl-5">
            <li>Plazo máximo: <span className="text-white">10 días corridos</span> desde la recepción.</li>
            <li>Producto <span className="text-white">sin uso</span> y en perfecto estado.</li>
            <li>Conserva embalaje original, sellos, bolsas, accesorios y manuales.</li>
            <li>Sin modificaciones, cambios de switches, lubricación ni intervención.</li>
            <li>Debe presentarse boleta o comprobante de compra.</li>
          </ul>

          <p className="mt-4 text-xs text-[#8b8d92]">
            Los costos de envío asociados a cambios son responsabilidad del
            cliente, excepto cuando el motivo sea un error atribuible a
            SaintGeek.
          </p>
        </div>

        {/* Devoluciones */}
        <div className="rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-6">
          <h2 className="text-lg font-medium text-white mb-3">
            Devoluciones
          </h2>
          <p className="text-sm text-[#a9abb0] leading-relaxed mb-3">
            Las devoluciones solo serán aceptadas en los siguientes casos:
          </p>
          <ul className="text-sm text-[#a9abb0] space-y-2 list-disc pl-5">
            <li>Falla de fábrica.</li>
            <li>Error en el producto enviado.</li>
            <li>Daño durante el transporte.</li>
          </ul>

          <p className="mt-4 text-xs text-[#8b8d92]">
            El daño por transporte debe informarse dentro de las primeras
            <span className="text-white"> 48 horas </span>
            desde la recepción, adjuntando evidencia visual.
          </p>
        </div>

        {/* Garantía */}
        <div className="rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-6">
          <h2 className="text-lg font-medium text-white mb-2">
            Garantía Legal
          </h2>
          <p className="text-sm text-[#a9abb0] leading-relaxed">
            Todos los productos vendidos por SaintGeek cuentan con
            <span className="text-white"> garantía legal de 6 meses </span>
            por fallas de fabricación. No cubre daños por golpes, líquidos,
            desgaste normal, uso indebido o modificaciones.
          </p>
        </div>

        {/* Excluidos */}
        <div className="rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-6">
          <h2 className="text-lg font-medium text-white mb-3">
            Productos Excluidos
          </h2>
          <ul className="text-sm text-[#a9abb0] space-y-2 list-disc pl-5">
            <li>Teclados o accesorios usados.</li>
            <li>Productos con switches cambiados, lubricados o modificados.</li>
            <li>Productos personalizados o configurados a pedido.</li>
            <li>Software, licencias digitales o códigos descargables.</li>
            <li>Productos incompletos o sin embalaje original.</li>
          </ul>
        </div>

        {/* Reembolsos */}
        <div className="rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-6">
          <h2 className="text-lg font-medium text-white mb-2">
            Reembolsos.
          </h2>
          <p className="text-sm text-[#a9abb0] leading-relaxed">
            Una vez aprobada la devolución, el reembolso se realizará dentro de
            un plazo de
            <span className="text-white"> 5 a 10 días hábiles </span>
            utilizando el mismo medio de pago original.
          </p>
        </div>

        {/* Contacto */}
        <div className="rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-6">
          <h2 className="text-lg font-medium text-white mb-2">
            Contacto SaintGeek
          </h2>
          <p className="text-sm text-[#a9abb0] leading-relaxed">
            Para solicitar un cambio o devolución, escríbenos indicando tu
            número de pedido y motivo.
          </p>
          <p className="mt-3 text-sm text-white">
            saintgeekventas@gmail.com
          </p>
        </div>
      </div>
    </section>
  )
}
