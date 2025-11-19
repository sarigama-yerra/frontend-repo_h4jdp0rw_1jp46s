export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <img
        src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop"
        alt="Cafe ambiance"
        className="w-full h-56 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20"></div>
      <div className="absolute bottom-4 left-4 right-4 text-stone-50">
        <h1 className="text-2xl font-bold">Cafe Yakjaaah</h1>
        <p className="text-stone-200 text-sm">Warm brews • Cozy bites • Good vibes</p>
      </div>
    </div>
  )
}
