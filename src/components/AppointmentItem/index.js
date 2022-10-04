import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onFavorite} = props
  const {id, appTitle, date, isFavorite} = appointmentDetails

  const FavoriteStar = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onFavoriteStar = () => {
    onFavorite(id)
  }

  return (
    <li className="appoinment-container">
      <div className="top-app">
        <p className="title">{appTitle}</p>
        <button
          type="button"
          className="btn-star-style"
          onClick={onFavoriteStar}
        >
          <img src={FavoriteStar} alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
