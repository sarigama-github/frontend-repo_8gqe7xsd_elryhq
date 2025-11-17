export default function Stats({ items = [] }) {
  const totalItems = items.length
  const totalQty = items.reduce((sum, i) => sum + (i.quantity || 0), 0)
  const lowStock = items.filter(i => (i.low_stock_threshold ?? 0) >= 0 && i.quantity <= (i.low_stock_threshold ?? 0)).length

  const cards = [
    { label: 'Unique items', value: totalItems },
    { label: 'Total in stock', value: totalQty },
    { label: 'Low stock', value: lowStock },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-sm">
          <p className="text-sm text-gray-600">{c.label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{c.value}</p>
        </div>
      ))}
    </div>
  )
}
