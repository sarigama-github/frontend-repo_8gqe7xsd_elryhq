import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import InventoryForm from './components/InventoryForm'
import InventoryTable from './components/InventoryTable'
import Stats from './components/Stats'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadAll = async () => {
    try {
      const res = await fetch(`${backend}/api/inventory`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setItems([])
    }
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />

      <main id="dashboard" className="relative z-10 -mt-12 md:-mt-16">
        <div className="mx-auto max-w-6xl px-6 space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InventoryForm onCreated={() => setRefreshKey((k) => k + 1)} />
            </div>
            <div>
              <Stats items={items} />
              <a href="/test" className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black">Test connectivity</a>
            </div>
          </div>

          <InventoryTable refreshKey={refreshKey} />
          <p className="text-xs text-gray-500 text-center pb-8">Set VITE_BACKEND_URL to your API base for persistence.</p>
        </div>
      </main>
    </div>
  )
}

export default App
