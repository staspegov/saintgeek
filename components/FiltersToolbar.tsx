'use client'

export default function FiltersToolbar() {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-sm text-[#b6b6b8]">Фильтры</div>
      <div className="flex items-center gap-2 text-sm">
        <select className="bg-[#0f0f11] border border-[#1a1a1c] rounded-lg px-2 py-1">
          <option>Сначала популярные</option>
          <option>По цене (возр.)</option>
          <option>По цене (убыв.)</option>
        </select>
      </div>
    </div>
  )
}
