import { useState } from 'react'

export default function BurgerCard({ burger, defaultImage, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false)
  const imageSrc = burger.image_url || defaultImage

  return (
    <div className="burger-card">
      <img
        className="burger-image"
        src={imageSrc}
        alt={burger.name}
        onClick={() => setShowModal(true)}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = defaultImage
        }}
      />
      {showModal && (
        <div className="image-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setShowModal(false)}>
              닫기
            </button>
            <img
              src={imageSrc}
              alt={burger.name}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = defaultImage
              }}
            />
          </div>
        </div>
      )}
      <div className="burger-card-header">
        <span className="rank-badge">#{burger.rank}</span>
        <h3>{burger.name}</h3>
      </div>
      <p className="menu">대표 메뉴: {burger.menu}</p>
      <p className="rating">⭐ {burger.rating}</p>
      <p className="price">{Number(burger.price).toLocaleString()}원</p>
      <p className="description">{burger.description}</p>
      <p className="location">📍 {burger.location}</p>
      <div className="card-actions">
        <button onClick={onEdit}>수정</button>
        <button className="delete-btn" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  )
}
