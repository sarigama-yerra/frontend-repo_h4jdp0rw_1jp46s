import { Home, Utensils, ShoppingCart, User } from 'lucide-react'

function TabItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center flex-1 py-2 ${active ? 'text-amber-700' : 'text-stone-500'}`}>
      <Icon className={`w-6 h-6 ${active ? 'fill-amber-600/10' : ''}`} />
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  )
}

export default function TabBar({ current, onChange }) {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-stone-50/90 backdrop-blur supports-[backdrop-filter]:bg-stone-50/70 border-t border-stone-200 rounded-t-2xl">
      <div className="max-w-md mx-auto flex">
        <TabItem icon={Home} label="Home" active={current==='home'} onClick={() => onChange('home')} />
        <TabItem icon={Utensils} label="Menu" active={current==='menu'} onClick={() => onChange('menu')} />
        <TabItem icon={ShoppingCart} label="Cart" active={current==='cart'} onClick={() => onChange('cart')} />
        <TabItem icon={User} label="Account" active={current==='account'} onClick={() => onChange('account')} />
      </div>
    </div>
  )
}
