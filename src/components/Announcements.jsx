export default function Announcements({ items }) {
  if (!items?.length) return null
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-stone-800 mb-3">Announcements</h2>
      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.id} className="bg-stone-50 border border-stone-200 rounded-2xl p-3">
            <div className="flex items-start gap-3">
              {a.image_url && (
                <img src={a.image_url} alt={a.title} className="w-14 h-14 rounded-xl object-cover" />
              )}
              <div>
                <p className="font-medium text-stone-800">{a.title}</p>
                <p className="text-sm text-stone-600">{a.message}</p>
                {a.tag && <span className="inline-block text-xs mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">{a.tag}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
