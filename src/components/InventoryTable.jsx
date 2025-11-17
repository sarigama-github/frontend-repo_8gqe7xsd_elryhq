import { useEffect, useState, useMemo } from 'react'

export default function InventoryTable({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (category) params.set('category', category)
      const res = await fetch(`${backend}/api/inventory?${params.toString()}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.category).filter(Boolean))
    return Array.from(set)
  }, [items])

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name or SKU..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
            <option value="">All categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button onClick={fetchItems} className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black">
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 px-4">SKU</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Unit Cost</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 pl-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">Loading...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">No items found</td>
              </tr>
            ) : (
              items.map((item) => {
                const low = (item.low_stock_threshold ?? 0) >= 0 && item.quantity <= (item.low_stock_threshold ?? 0)
                return (
                  <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50/70">
                    <td className="py-2 pr-4 font-medium text-gray-900">{item.name}</td>
                    <td className="py-2 px-4 text-gray-700">{item.sku || '—'}</td>
                    <td className="py-2 px-4 text-gray-700">{item.category || '—'}</td>
                    <td className="py-2 px-4 text-gray-700">{item.quantity}</td>
                    <td className="py-2 px-4 text-gray-700">{item.unit_cost ? `$${item.unit_cost.toFixed(2)}` : '—'}</td>
                    <td className="py-2 px-4 text-gray-700">{item.location || '—'}</td>
                    <td className="py-2 pl-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${low ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {low ? 'Low stock' : 'OK'}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
