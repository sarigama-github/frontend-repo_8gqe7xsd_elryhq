import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability (doesn't block interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white"></div>

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-black/5">
            Effortless inventory, elevated
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            Inventory that feels intuitive and modern
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 max-w-2xl">
            A clean, minimalist workspace for personal or small business stock. Fast capture, smart search, and clear low‑stock alerts—without the clutter.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#dashboard" className="inline-flex items-center justify-center rounded-lg bg-red-500 text-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60">
              Get Started
            </a>
            <a href="/test" className="inline-flex items-center justify-center rounded-lg bg-white/80 backdrop-blur text-gray-900 px-5 py-3 text-sm font-semibold shadow-sm ring-1 ring-black/5 hover:bg-white">
              Check Backend
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
