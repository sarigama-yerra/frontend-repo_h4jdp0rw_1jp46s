import { motion } from 'framer-motion'

export default function Specials({ specials }) {
  if (!specials?.length) return null
  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-800 mb-3">Featured specials</h2>
      <div className="grid grid-cols-2 gap-3">
        {specials.map((s, idx) => (
          <motion.div
            key={s.id}
            className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden"
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ y: -2, boxShadow: '0 6px 24px rgba(0,0,0,0.06)' }}
          >
            <img src={s.image_url} alt={s.title} className="h-24 w-full object-cover" />
            <div className="p-3">
              <p className="font-medium text-stone-800">{s.title}</p>
              <p className="text-sm text-stone-600 line-clamp-2">{s.description}</p>
              <p className="text-amber-700 font-semibold mt-1">${s.price.toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
