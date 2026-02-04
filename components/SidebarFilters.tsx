"use client"

import { useMemo, useState } from "react"

type Category = "teclados" | "ratones-gamer" | "keyboard" | "mouse" | "ratones"

type Props = {
  category: Category

  // Común
  onModel: (m: string | null) => void

  // Teclados
  onNumpad?: (n: "Sí" | "No" | null) => void
  onSwitch?: (sw: string | null) => void
  onSwitchType?: (t: string | null) => void

  // Ratones
  onSensor?: (s: string | null) => void
  onWeight?: (w: string | null) => void
  onConnection?: (c: string | null) => void
  onShape?: (sh: string | null) => void

  // Opcional: para NO hardcodear opciones (recomendado)
  options?: Partial<{
    // Común
    models: string[]

    // Teclados
    numpad: Array<"Sí" | "No">
    switches: string[]
    switchTypes: string[]

    // Ratones
    sensors: string[]
    weights: string[]
    connections: string[]
    shapes: string[]
  }>
}

type RowConfig = {
  id: string
  title: string
  cols: number
  options: string[]
  onChange?: (v: string | null) => void
  resetLabel?: string
}

function normalizeCategory(cat: Category) {
  if (cat === "teclados") return "keyboard"
  if (cat === "ratones-gamer") return "mouse"
  return cat
}

export default function SidebarFilters({
  category,
  onModel,
  onNumpad,
  onSwitch,
  onSwitchType,
  onSensor,
  onWeight,
  onConnection,
  onShape,
  options,
}: Props) {
  const kind = normalizeCategory(category)

  const [open, setOpen] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  // estados seleccionados
  const [selected, setSelected] = useState<Record<string, string | null>>({})
  const [resetHighlightId, setResetHighlightId] = useState<string | null>(null)

  const handleSelect = (id: string, value: string | null, cb?: (v: string | null) => void) => {
    setSelected((prev) => ({ ...prev, [id]: value }))
    setResetHighlightId(null)
    cb?.(value)
  }

  const handleReset = (id: string, cb?: (v: string | null) => void) => {
    setSelected((prev) => ({ ...prev, [id]: null }))
    cb?.(null)
    setResetHighlightId(id)
  }

  // 👇 calculamos si algún filtro está activo
  const anySelected = Object.values(selected).some((v) => v !== null)

  const Row = ({
    title,
    id,
    children,
  }: {
    title: string
    id: string
    children: React.ReactNode
  }) => (
    <div>
      <button
        type="button"
        className="w-full text-left px-2 py-3 rounded-lg text-[#d4d4d8] flex items-center justify-between hover:bg-black/10"
        onClick={() => setOpen(open === id ? null : id)}
      >
        <span className="text-[14px]">{title}</span>
        <span className="w-6 h-6 inline-flex items-center justify-center border border-[#262629] rounded-lg text-[#a8a8ad]">
          {open === id ? "–" : "+"}
        </span>
      </button>
      {open === id && <div className="px-2 pb-2">{children}</div>}
    </div>
  )

  const rows: RowConfig[] = useMemo(() => {
    const defaults = {
      // común
      models: ["AG61", "TK68", "TK61"],

      // teclados
      numpad: ["Sí", "No"] as Array<"Sí" | "No">,
      switches: ["Blue", "Red", "Brown", "Silent"],
      switchTypes: ["Mecánicos", "De membrana"],

      // ratones
      sensors: ["PAW3311", "PAW3395", "PAW3370"],
      weights: ["< 60g", "60–75g", "> 75g"],
      connections: ["Cable", "Inalámbrico", "Ambos"],
      shapes: ["Ambidiestro", "Ergonómico"],
    }

    const opt = { ...defaults, ...(options ?? {}) }

    if (kind === "keyboard") {
      return [
        {
          id: "numpad",
          title: "Teclado numérico",
          cols: 2,
          options: opt.numpad,
          onChange: onNumpad as unknown as ((v: string | null) => void) | undefined,
          resetLabel: "Todos",
        },
        {
          id: "switch",
          title: "Switches",
          cols: 2,
          options: opt.switches,
          onChange: onSwitch,
          resetLabel: "Todos",
        },
        {
          id: "switchType",
          title: "Tipo de switch",
          cols: 2,
          options: opt.switchTypes,
          onChange: onSwitchType,
          resetLabel: "Todos",
        },
        {
          id: "model",
          title: "Modelo",
          cols: 3,
          options: opt.models,
          onChange: onModel,
          resetLabel: "Todos",
        },
      ].filter((r) => !!r.onChange) // solo muestra filtros con callback
    }

    // mouse
    return [
      {
        id: "sensor",
        title: "Sensor",
        cols: 2,
        options: opt.sensors,
        onChange: onSensor,
        resetLabel: "Todos",
      },
      {
        id: "weight",
        title: "Peso",
        cols: 2,
        options: opt.weights,
        onChange: onWeight,
        resetLabel: "Todos",
      },
      {
        id: "connection",
        title: "Conectividad",
        cols: 2,
        options: opt.connections,
        onChange: onConnection,
        resetLabel: "Todos",
      },
      {
        id: "shape",
        title: "Forma",
        cols: 2,
        options: opt.shapes,
        onChange: onShape,
        resetLabel: "Todos",
      },
      {
        id: "model",
        title: "Modelo",
        cols: 3,
        options: opt.models,
        onChange: onModel,
        resetLabel: "Todos",
      },
    ].filter((r) => !!r.onChange)
  }, [
    kind,
    options,
    onModel,
    onNumpad,
    onSwitch,
    onSwitchType,
    onSensor,
    onWeight,
    onConnection,
    onShape,
  ])

  return (
    <aside aria-label="Filtros" className="w-full lg:w-[270px]">
      {/* Botón toggle en móvil */}
      <button
        type="button"
        className="lg:hidden w-full mb-3 rounded-xl px-4 py-2 text-sm font-semibold"
        style={{ background: "#1a1a1c", color: "#eaeaea" }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Ocultar filtros ▲" : "Mostrar filtros ▼"}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 
        ${visible ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0 lg:opacity-100 lg:max-h-none"}`}
      >
        <div className="flex-none border border-[#1a1a1c] bg-[#0f0f11] rounded-2xl p-3">
          <div className="flex items-center gap-2 px-2 pb-3 border-b border-[#1a1a1c]">
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
              <path
                fill={anySelected ? "#C0FF03" : "#b6b6b8"}
                d="M3 6h18v2H3V6zm4 5h10v2H7v-2zm3 5h4v2h-4v-2z"
              />
            </svg>
            <div className="font-bold text-[#f0f0f1]">Filtros</div>
          </div>

          <div className="pt-1 space-y-1 text-sm text-[#d4d4d8]">
            {rows.map((r) => (
              <Row key={r.id} title={r.title} id={r.id}>
                <div className={`grid gap-2 ${r.cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {r.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelect(r.id, opt, r.onChange)}
                      className={`rounded-lg py-1 border transition ${
                        selected[r.id] === opt
                          ? "border-lime-400"
                          : "border-[#262629] hover:border-[#C0FF03]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleReset(r.id, r.onChange)}
                    className={`rounded-lg py-1 border transition ${
                      (r.cols === 3 ? "col-span-3" : "col-span-2")
                    } ${
                      resetHighlightId === r.id ? "border-lime-400" : "border-[#262629]"
                    }`}
                  >
                    {r.resetLabel ?? "Todos"}
                  </button>
                </div>
              </Row>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
