// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    if (title !== '' && date !== '') {
      const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

      const newAppointment = {
        id: uuidv4(),
        title,
        date: formattedDate,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  toggleFilter = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  render() {
    const {title, date, appointmentsList, isFilterActive} = this.state

    const filteredList = isFilterActive
      ? appointmentsList.filter(each => each.isStarred)
      : appointmentsList

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="top-section">
            <div className="form-container">
              <h1>Add Appointment</h1>

              <form onSubmit={this.addAppointment}>
                <label htmlFor="title">Title</label>

                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChangeTitle}
                />

                <label htmlFor="date">Date</label>

                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={this.onChangeDate}
                />

                <button type="submit">Add</button>
              </form>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <hr />

          <div className="appointments-header">
            <h2>Appointments</h2>

            <button
              type="button"
              onClick={this.toggleFilter}
              className={isFilterActive ? 'active-filter' : ''}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {filteredList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
