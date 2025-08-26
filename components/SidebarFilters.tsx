'use client'

import { useState } from 'react'

export default function SidebarFilters({ onModel }: { onModel: (m: string | null) => void }) {
  // estado del acordeón
  const [open, setOpen] = useState<string | null>(null)
  // estado global (mobile dropdown)
  const [visible, setVisible] = useState(false)

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
      {open === id && children}
    </div>
  )

  return (
    <aside aria-label="Фильтры" className="w-full lg:w-[270px]">
      {/* Botón toggle solo en mobile */}
      <button
        className="lg:hidden w-full mb-3 rounded-xl px-4 py-2 text-sm font-semibold"
        style={{ background: '#1a1a1c', color: '#eaeaea' }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? 'Ocultar filtros ▲' : 'Mostrar filtros ▼'}
      </button>

      {/* Contenedor principal de filtros */}
      <div
        className={`overflow-hidden transition-all duration-300 
        ${visible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 lg:opacity-100 lg:max-h-none'}`}
      >
        <div className="flex-none border border-[#1a1a1c] bg-[#0f0f11] rounded-2xl p-3">
          <div className="flex items-center gap-2 px-2 pb-3 border-b border-[#1a1a1c]">
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
              <path
                fill="#b6b6b8"
                d="M3 6h18v2H3V6zm4 5h10v2H7v-2zm3 5h4v2h-4v-2z"
              />
            </svg>
            <div className="font-bold text-[#f0f0f1]">Фильтры</div>
          </div>

          <div className="pt-1 space-y-1">
            <Row title="Магазин" id="shop" />
            <Row title="Производитель" id="brand" />
            <Row title="Цифровой блок" id="numpad" />
            <Row title="Переключатели" id="switch" />
            <Row title="Тип переключателей" id="switch-type" />

            {/* Model filter (AG61/TK68/TK61) */}
            <Row title="Модель" id="model">
              <div className="px-2 pb-2 grid grid-cols-3 gap-2 text-sm text-[#d4d4d8]">
                {['AG61', 'TK68', 'TK61'].map((m) => (
                  <button
                    key={m}
                    className="border border-[#262629] rounded-lg py-1 hover:border-[#89ff00]"
                    onClick={() => onModel(m)}
                  >
                    {m}
                  </button>
                ))}
                <button
                  className="col-span-3 border border-[#262629] rounded-lg py-1"
                  onClick={() => onModel(null)}
                >
                  Сбросить
                </button>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </aside>
  )
}
