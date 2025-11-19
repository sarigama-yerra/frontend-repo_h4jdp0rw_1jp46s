import { useMemo } from 'react'

export default function Cart({ items, onChangeQty, onCheckout, mode, setMode }) {
  const subtotal = useMemo(() => items.reduce((s,i)=> s + i.price * i.quantity, 0), [items])
  const tax = useMemo(() => +(subtotal * 0.08).toFixed(2), [subtotal])
  const total = useMemo(() => +(subtotal + tax).toFixed(2), [subtotal, tax])

  return (
    <div className="pb-28">
      <div className="flex gap-2 mb-4">
        {['pickup','delivery'].map(m => (
          <button key={m} onClick={()=>setMode(m)} className={`flex-1 py-2 rounded-xl capitalize ${mode===m ? 'bg-amber-200 text-amber-900' : 'bg-stone-100 text-stone-700'}`}>{m}</button>
        ))}
      </div>

      <div className="space-y-3">
        {items.length===0 && <p className="text-stone-500">Your cart is empty.</p>}
        {items.map((i)=> (
          <div key={i.id} className="bg-white border border-stone-200 rounded-2xl p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-stone-800">{i.name}</p>
                <p className="text-xs text-stone-500">${'{'}i.price.toFixed(2){'}'} • Qty</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>onChangeQty(i.id, Math.max(1, i.quantity-1))} className="w-8 h-8 rounded-lg bg-stone-100">-</button>
                <span className="w-6 text-center">{i.quantity}</span>
                <button onClick={()=>onChangeQty(i.id, i.quantity+1)} className="w-8 h-8 rounded-lg bg-stone-100">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mt-4">
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Subtotal</span>
          <span className="font-medium">${'{'}subtotal.toFixed(2){'}'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Tax</span>
          <span className="font-medium">${'{'}tax.toFixed(2){'}'}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-stone-800">Total</span>
          <span className="font-semibold text-amber-700">${'{'}total.toFixed(2){'}'}</span>
        </div>
        <button onClick={()=>onCheckout({ subtotal, tax, total })} className="w-full mt-4 py-3 rounded-xl bg-amber-600 text-white font-semibold">Secure checkout</button>
      </div>
    </div>
  )
}
