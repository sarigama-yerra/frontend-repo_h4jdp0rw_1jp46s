import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Cart({ items, onChangeQty, onCheckout, mode, setMode }) {
  const subtotal = useMemo(() => items.reduce((s,i)=> s + i.price * i.quantity, 0), [items])
  const tax = useMemo(() => +(subtotal * 0.08).toFixed(2), [subtotal])
  const total = useMemo(() => +(subtotal + tax).toFixed(2), [subtotal, tax])

  return (
    <div className="pb-28">
      <div className="flex gap-2 mb-4">
        {['pickup','delivery'].map(m => (
          <motion.button key={m} onClick={()=>setMode(m)} whileTap={{ scale: 0.96 }} className={`flex-1 py-2 rounded-xl capitalize ${mode===m ? 'bg-amber-200 text-amber-900' : 'bg-stone-100 text-stone-700'}`}>{m}</motion.button>
        ))}
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {items.length===0 && (
            <motion.p className="text-stone-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Your cart is empty.</motion.p>
          )}
          {items.map((i)=> (
            <motion.div key={i.id} className="bg-white border border-stone-200 rounded-2xl p-3" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }} layout>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-stone-800">{i.name}</p>
                  <p className="text-xs text-stone-500">${i.price.toFixed(2)} • Qty</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button onClick={()=>onChangeQty(i.id, Math.max(1, i.quantity-1))} className="w-8 h-8 rounded-lg bg-stone-100" whileTap={{ scale: 0.9 }}>-</motion.button>
                  <span className="w-6 text-center">{i.quantity}</span>
                  <motion.button onClick={()=>onChangeQty(i.id, i.quantity+1)} className="w-8 h-8 rounded-lg bg-stone-100" whileTap={{ scale: 0.9 }}>+</motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mt-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-stone-800">Total</span>
          <span className="font-semibold text-amber-700">${total.toFixed(2)}</span>
        </div>
        <motion.button onClick={()=>onCheckout({ subtotal, tax, total })} className="w-full mt-4 py-3 rounded-xl bg-amber-600 text-white font-semibold" whileTap={{ scale: 0.98 }} whileHover={{ y: -1, boxShadow: '0 6px 18px rgba(217, 119, 6, 0.35)' }}>Secure checkout</motion.button>
      </motion.div>
    </div>
  )
}
