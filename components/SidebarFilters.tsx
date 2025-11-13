'use client'

import { useState } from 'react'

type Props = {
  onModel: (m: string | null) => void
  onNumpad?: (n: string | null) => void
  onSwitch?: (sw: string | null) => void
  onSwitchType?: (t: string | null) => void
}

export default function SidebarFilters({
  onModel,
  onNumpad,
  onSwitch,
  onSwitchType,
}: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  // estados seleccionados
  const [selected, setSelected] = useState<Record<string, string | null>>({})
  const [resetHighlight, setResetHighlight] = useState(false)

  const handleSelect = (id: string, value: string | null, cb?: (v: string | null) => void) => {
    setSelected(prev => ({ ...prev, [id]: value }))
    setResetHighlight(false)
    cb?.(value)
  }

  const handleReset = (id: string, cb?: (v: string | null) => void) => {
    setSelected(prev => ({ ...prev, [id]: null }))
    cb?.(null)
    setResetHighlight(true)
  }

  // 👇 calculamos si algún filtro está activo
  const anySelected = Object.values(selected).some(v => v !== null)

  const Row = ({ title, id, children }: any) => (
    <div>
      <button
        className="w-full text-left px-2 py-3 rounded-lg text-[#d4d4d8] flex items-center justify-between hover:bg-black/10"
        onClick={() => setOpen(open === id ? null : id)}
      >
        <span className="text-[14px]">{title}</span>
        <span className="w-6 h-6 inline-flex items-center justify-center border border-[#262629] rounded-lg text-[#a8a8ad]">
          {open === id ? '–' : '+'}
        </span>
      </button>
      {open === id && <div className="px-2 pb-2">{children}</div>}
    </div>
  )

  return (
    <aside aria-label="Filtros" className="w-full lg:w-[270px]">
      {/* Botón toggle en móvil */}
      <button
        className="lg:hidden w-full mb-3 rounded-xl px-4 py-2 text-sm font-semibold"
        style={{ background: '#1a1a1c', color: '#eaeaea' }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? 'Ocultar filtros ▲' : 'Mostrar filtros ▼'}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 
        ${visible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 lg:opacity-100 lg:max-h-none'}`}
      >
        <div className="flex-none border border-[#1a1a1c] bg-[#0f0f11] rounded-2xl p-3">
          <div className="flex items-center gap-2 px-2 pb-3 border-b border-[#1a1a1c]">
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
              <path
                fill={anySelected ? '#C0FF03' : '#b6b6b8'} // 👈 verde si hay filtros
                d="M3 6h18v2H3V6zm4 5h10v2H7v-2zm3 5h4v2h-4v-2z"
              />
            </svg>
            <div className="font-bold text-[#f0f0f1]">Filtros</div>
          </div>

          <div className="pt-1 space-y-1 text-sm text-[#d4d4d8]">
            {/* Teclado numérico */}
            <Row title="Teclado numérico" id="numpad">
              <div className="grid grid-cols-2 gap-2">
                {['Sí', 'No'].map(n => (
                  <button
                    key={n}
                    onClick={() => handleSelect('numpad', n, onNumpad)}
                    className={`rounded-lg py-1 border transition ${
                      selected['numpad'] === n ? 'border-lime-400' : 'border-[#262629] hover:border-[#C0FF03]'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => handleReset('numpad', onNumpad)}
                  className={`col-span-2 rounded-lg py-1 border transition ${
                    resetHighlight ? 'border-lime-400' : 'border-[#262629]'
                  }`}
                >
                  Todos
                </button>
              </div>
            </Row>

            {/* Switches */}
            <Row title="Switches" id="switch">
              <div className="grid grid-cols-2 gap-2">
                {['Blue', 'Red', 'Brown', 'Silent'].map(sw => (
                  <button
                    key={sw}
                    onClick={() => handleSelect('switch', sw, onSwitch)}
                    className={`rounded-lg py-1 border transition ${
                      selected['switch'] === sw ? 'border-lime-400' : 'border-[#262629] hover:border-[#C0FF03]'
                    }`}
                  >
                    {sw}
                  </button>
                ))}
                <button
                  onClick={() => handleReset('switch', onSwitch)}
                  className={`col-span-2 rounded-lg py-1 border transition ${
                    resetHighlight ? 'border-lime-400' : 'border-[#262629]'
                  }`}
                >
                  Todos
                </button>
              </div>
            </Row>

            {/* Tipo de switch */}
            <Row title="Tipo de switch" id="switch-type">
              <div className="grid grid-cols-2 gap-2">
                {['Mecánicos', 'De membrana'].map(t => (
                  <button
                    key={t}
                    onClick={() => handleSelect('switch-type', t, onSwitchType)}
                    className={`rounded-lg py-1 border transition ${
                      selected['switch-type'] === t ? 'border-lime-400' : 'border-[#262629] hover:border-[#C0FF03]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
                <button
                  onClick={() => handleReset('switch-type', onSwitchType)}
                  className={`col-span-2 rounded-lg py-1 border transition ${
                    resetHighlight ? 'border-lime-400' : 'border-[#262629]'
                  }`}
                >
                  Todos
                </button>
              </div>
            </Row>

            {/* Modelo */}
            <Row title="Modelo" id="model">
              <div className="grid grid-cols-3 gap-2">
                {['AG61', 'TK68', 'TK61'].map(m => (
                  <button
                    key={m}
                    onClick={() => handleSelect('model', m, onModel)}
                    className={`rounded-lg py-1 border transition ${
                      selected['model'] === m ? 'border-lime-400' : 'border-[#262629] hover:border-[#C0FF03]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
                <button
                  onClick={() => handleReset('model', onModel)}
                  className={`col-span-3 rounded-lg py-1 border transition ${
                    resetHighlight ? 'border-lime-400' : 'border-[#262629]'
                  }`}
                >
                  Todos
                </button>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </aside>
  )
}
