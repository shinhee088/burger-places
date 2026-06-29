export default function BurgerForm({ form, setForm, onSubmit, isEditing, onCancel }) {
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="burger-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? '맛집 수정' : '맛집 추가'}</h2>
      <div className="form-grid">
        <input
          name="rank"
          type="number"
          placeholder="순위"
          value={form.rank}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="가게명"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="menu"
          placeholder="대표 메뉴"
          value={form.menu}
          onChange={handleChange}
          required
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="별점 (0~5)"
          value={form.rating}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="가격 (원)"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="위치"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          name="image_url"
          placeholder="이미지 URL (선택)"
          value={form.image_url}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="설명"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">{isEditing ? '수정 완료' : '추가하기'}</button>
        {isEditing && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            취소
          </button>
        )}
      </div>
    </form>
  )
}
