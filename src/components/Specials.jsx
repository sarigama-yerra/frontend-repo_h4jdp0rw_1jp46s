export default function Specials({ specials }) {
  if (!specials?.length) return null
  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-800 mb-3">Featured specials</h2>
      <div className="grid grid-cols-2 gap-3">
        {specials.map((s) => (
          <div key={s.id} className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden">
            <img src={s.image_url} alt={s.title} className="h-24 w-full object-cover" />
            <div className="p-3">
              <p className="font-medium text-stone-800">{s.title}</p>
              <p className="text-sm text-stone-600 line-clamp-2">{s.description}</p>
              <p className="text-amber-700 font-semibold mt-1">${'{'}s.price.toFixed(2){'}'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
