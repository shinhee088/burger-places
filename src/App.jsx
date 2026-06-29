import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import BurgerForm from './BurgerForm'
import BurgerCard from './BurgerCard'

const emptyForm = {
  id: null,
  rank: '',
  name: '',
  menu: '',
  rating: '',
  price: '',
  description: '',
  location: '',
  image_url: '',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'

export default function App() {
  const [burgers, setBurgers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchBurgers()
  }, [])

  async function fetchBurgers() {
    setLoading(true)
    const { data, error } = await supabase
      .from('burgers')
      .select('*')
      .order('rank', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setBurgers(data)
      setError(null)
    }
    setLoading(false)
  }

  async function handleSubmit(values) {
    const payload = {
      rank: Number(values.rank),
      name: values.name,
      menu: values.menu,
      rating: Number(values.rating),
      price: Number(values.price),
      description: values.description,
      location: values.location,
      image_url: values.image_url,
    }

    let error
    if (editingId) {
      const res = await supabase.from('burgers').update(payload).eq('id', editingId)
      error = res.error
    } else {
      const res = await supabase.from('burgers').insert(payload)
      error = res.error
    }

    if (error) {
      setError(error.message)
      return
    }

    setForm(emptyForm)
    setEditingId(null)
    setError(null)
    fetchBurgers()
  }

  function handleEdit(burger) {
    setEditingId(burger.id)
    setForm({
      id: burger.id,
      rank: burger.rank,
      name: burger.name,
      menu: burger.menu,
      rating: burger.rating,
      price: burger.price,
      description: burger.description,
      location: burger.location,
      image_url: burger.image_url || '',
    })
    setShowForm(true)
  }

  async function handleDelete(id) {
    const ok = window.confirm('이 맛집을 삭제할까요?')
    if (!ok) return

    const { error } = await supabase.from('burgers').delete().eq('id', id)
    if (error) {
      setError(error.message)
      return
    }
    if (editingId === id) {
      setEditingId(null)
      setForm(emptyForm)
    }
    fetchBurgers()
  }

  function handleCancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
  }

  const filteredBurgers = burgers.filter((burger) => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return true
    return [burger.name, burger.menu, burger.location, burger.description]
      .join(' ')
      .toLowerCase()
      .includes(keyword)
  })

  function handleSearch() {
    setSearch(searchInput)
  }

  return (
    <div className="container">
      <h1>햄버거 맛집 도장깨기</h1>

      {error && <div className="error">에러: {error}</div>}

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="가게명, 메뉴, 위치로 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>
          검색
        </button>
      </div>

      <button className="toggle-form-btn" onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? '닫기' : '맛집 추가하기'}
      </button>

      {showForm && (
        <BurgerForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          isEditing={!!editingId}
          onCancel={handleCancelEdit}
        />
      )}

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <div className="card-list">
          {filteredBurgers.map((burger) => (
            <BurgerCard
              key={burger.id}
              burger={burger}
              defaultImage={DEFAULT_IMAGE}
              onEdit={() => handleEdit(burger)}
              onDelete={() => handleDelete(burger.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
