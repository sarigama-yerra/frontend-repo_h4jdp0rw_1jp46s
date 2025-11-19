import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Specials from './components/Specials'
import Announcements from './components/Announcements'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Account from './components/Account'
import TabBar from './components/TabBar'

function Section({ title, children }) {
  return (
    <section className="mt-6">
      {title && <h2 className="text-lg font-semibold text-stone-800 mb-3">{title}</h2>}
      {children}
    </section>
  )
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

export default function App() {
  const [tab, setTab] = useState('home')
  const [specials, setSpecials] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [cart, setCart] = useState([])
  const [mode, setMode] = useState('pickup')
  const [auth, setAuth] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/specials`).then(r=>r.json()).then(setSpecials).catch(()=>{})
    fetch(`${baseUrl}/api/announcements`).then(r=>r.json()).then(setAnnouncements).catch(()=>{})
  }, [])

  const addToCart = (item) => {
    setCart((prev)=>{
      const exists = prev.find(i=>i.id===item.id)
      if (exists) return prev.map(i=> i.id===item.id ? {...i, quantity: i.quantity+1} : i)
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
    setTab('cart')
  }

  const changeQty = (id, qty) => {
    setCart(prev => prev.map(i=> i.id===id ? { ...i, quantity: qty } : i))
  }

  const checkout = async ({ subtotal, tax, total }) => {
    if (!auth?.email) {
      alert('Please login to checkout')
      setTab('account')
      return
    }
    const payload = {
      user_email: auth.email,
      items: cart.map(i=> ({ menu_item_id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      subtotal, tax, total, fulfillment: mode
    }
    const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (res.ok) {
      alert(`Order placed! ID: ${data.order_id}`)
      setCart([])
      setTab('home')
    } else {
      alert(data.detail || 'Checkout failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-50">
      <div className="max-w-md mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          {tab==='home' && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.28, ease: 'easeOut' }}>
              <div className="pt-4">
                <Hero />
              </div>
              <Section>
                <Specials specials={specials} />
              </Section>
              <Section>
                <Announcements items={announcements} />
              </Section>
            </motion.div>
          )}

          {tab==='menu' && (
            <motion.div key="menu" className="pt-4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.28, ease: 'easeOut' }}>
              <Menu onAdd={addToCart} auth={auth} />
            </motion.div>
          )}

          {tab==='cart' && (
            <motion.div key="cart" className="pt-4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.28, ease: 'easeOut' }}>
              <Cart items={cart} onChangeQty={changeQty} onCheckout={checkout} mode={mode} setMode={setMode} />
            </motion.div>
          )}

          {tab==='account' && (
            <motion.div key="account" className="pt-4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.28, ease: 'easeOut' }}>
              <Account auth={auth} setAuth={setAuth} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TabBar current={tab} onChange={setTab} />
    </div>
  )
}
