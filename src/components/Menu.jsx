import { useEffect, useState } from 'react'
import { Heart, Plus, Search } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'mains', label: 'Mains' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'beverages', label: 'Beverages' },
  { key: 'desserts', label: 'Desserts' },
]

export default function Menu({ onAdd, auth }) {
  const [active, setActive] = useState('breakfast')
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { fetchItems(active) }, [active])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchItems = async (category) => {
    const res = await fetch(`${baseUrl}/api/menu?category=${category}`)
    const data = await res.json()
    setItems(data)
  }

  const toggleFav = async (id) => {
    if (!auth?.email) return
    const res = await fetch(`${baseUrl}/api/favorites/toggle`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: auth.email, item_id: id })
    })
    if (res.ok) {
      // optimistic UI: nothing else needed
    }
  }

  const filtered = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="pb-24">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {categories.map(c => (
          <motion.button
            key={c.key}
            onClick={() => setActive(c.key)}
            whileTap={{ scale: 0.96 }}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${active===c.key ? 'bg-amber-200 text-amber-900' : 'bg-stone-100 text-stone-700'}`}
          >
            {c.label}
          </motion.button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search menu" className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-100 outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.25, delay: (idx % 6) * 0.03 }}
            whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}
          >
            {item.image_url && <motion.img src={item.image_url} alt={item.name} className="h-24 w-full object-cover" initial={{ scale: 1.03 }} whileHover={{ scale: 1.06 }} transition={{ duration: 0.4 }} />}
            <div className="p-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold text-stone-800">{item.name}</p>
                  <p className="text-xs text-stone-500 line-clamp-2">{item.description}</p>
                </div>
                <motion.button onClick={() => toggleFav(item.id)} className="text-amber-700" whileTap={{ scale: 0.9 }}>
                  <Heart className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-amber-700 font-semibold">${item.price.toFixed(2)}</span>
                <motion.button onClick={()=> onAdd(item)} className="px-2 py-1 rounded-lg bg-amber-600 text-white text-sm flex items-center gap-1" whileTap={{ scale: 0.95 }}>
                  <Plus className="w-4 h-4" /> Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
