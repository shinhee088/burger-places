export default function BurgerCard({ burger, defaultImage, onEdit, onDelete }) {
  return (
    <div className="burger-card">
      <img
        className="burger-image"
        src={burger.image_url || defaultImage}
        alt={burger.name}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = defaultImage
        }}
      />
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
