import { useEffect, useState } from 'react'

export default function Account({ auth, setAuth }) {
  const [mode, setMode] = useState(auth?.email ? 'profile' : 'login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [favorites, setFavorites] = useState([])
  const [loyalty, setLoyalty] = useState(0)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (auth?.email) {
      setMode('profile')
      fetchFavs()
      setLoyalty(auth.loyalty_points || 0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.email])

  const submit = async () => {
    const endpoint = mode==='signup' ? '/api/auth/signup' : '/api/auth/login'
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      setAuth({ email: data.email, name: data.name, token: data.token, loyalty_points: data.loyalty_points })
    } else {
      alert(data.detail || 'Error')
    }
  }

  const fetchFavs = async () => {
    const res = await fetch(`${baseUrl}/api/favorites?email=${auth.email}`)
    const data = await res.json()
    if (res.ok) setFavorites(data.favorites)
  }

  return (
    <div className="pb-28">
      {mode !== 'profile' ? (
        <div className="space-y-3">
          <div className="flex gap-2 mb-2">
            <button onClick={()=>setMode('login')} className={`flex-1 py-2 rounded-xl ${mode==='login'?'bg-amber-200 text-amber-900':'bg-stone-100 text-stone-700'}`}>Login</button>
            <button onClick={()=>setMode('signup')} className={`flex-1 py-2 rounded-xl ${mode==='signup'?'bg-amber-200 text-amber-900':'bg-stone-100 text-stone-700'}`}>Sign up</button>
          </div>
          {mode==='signup' && (
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full px-3 py-2 rounded-xl bg-stone-100" />
          )}
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full px-3 py-2 rounded-xl bg-stone-100" />
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full px-3 py-2 rounded-xl bg-stone-100" />
          <button onClick={submit} className="w-full py-3 rounded-xl bg-amber-600 text-white font-semibold">{mode==='signup'?'Create account':'Login'}</button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="font-semibold text-stone-800">Welcome, {auth.name}</p>
            <p className="text-sm text-stone-600">{auth.email}</p>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <p className="font-semibold text-stone-800">Loyalty points</p>
            <p className="text-amber-700 text-2xl font-bold">{loyalty}</p>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <p className="font-semibold text-stone-800 mb-2">Favorites</p>
            {favorites.length===0 ? (
              <p className="text-stone-500 text-sm">No favorites yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {favorites.map(id => (
                  <span key={id} className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-sm">{id}</span>
                ))}
              </div>
            )}
          </div>
          <button onClick={()=>setAuth(null)} className="w-full py-3 rounded-xl bg-stone-200 text-stone-800">Logout</button>
        </div>
      )}
    </div>
  )
}
