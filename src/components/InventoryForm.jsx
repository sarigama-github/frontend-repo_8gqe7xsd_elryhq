import { useState } from 'react'

export default function InventoryForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    unit_cost: 0,
    location: '',
    notes: '',
    low_stock_threshold: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'quantity' || name === 'low_stock_threshold' ? Number(value) : name === 'unit_cost' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create item')
      const data = await res.json()
      onCreated?.(data.id)
      setForm({ name: '', sku: '', category: '', quantity: 0, unit_cost: 0, location: '', notes: '', low_stock_threshold: 0 })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-4 md:p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="e.g., 12oz Coffee Cup" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input name="sku" value={form.sku} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="Optional" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="e.g., Packaging" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="Shelf A, Bin 2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min={0} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit Cost</label>
          <input type="number" step="0.01" name="unit_cost" value={form.unit_cost} onChange={handleChange} min={0} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Low Stock Threshold</label>
          <input type="number" name="low_stock_threshold" value={form.low_stock_threshold} onChange={handleChange} min={0} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="Any details..." />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end">
        <button disabled={loading} className="inline-flex items-center justify-center rounded-lg bg-red-500 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-red-600 disabled:opacity-60">
          {loading ? 'Saving...' : 'Add Item'}
        </button>
      </div>
    </form>
  )
}
