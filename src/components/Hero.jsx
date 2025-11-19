import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.div className="relative overflow-hidden rounded-3xl" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
      <motion.img
        src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop"
        alt="Cafe ambiance"
        className="w-full h-56 object-cover"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20"></div>
      <motion.div className="absolute bottom-4 left-4 right-4 text-stone-50" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
        <h1 className="text-2xl font-bold">Cafe Yakjaaah</h1>
        <p className="text-stone-200 text-sm">Warm brews • Cozy bites • Good vibes</p>
      </motion.div>
    </motion.div>
  )
}
