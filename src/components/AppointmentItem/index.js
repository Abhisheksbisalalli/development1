// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-header">
        <p className="title">{title}</p>

        <button
          type="button"
          data-testid="star"
          onClick={onClickStar}
          className="star-btn"
        >
          <img src={starImg} alt="star" />
        </button>
      </div>

      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
