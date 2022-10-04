import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isStarred: false}

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      appTitle: title,
      date: formatDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onStarred = () => {
    const {isStarred} = this.state
    this.setState({isStarred: !isStarred})
  }

  onFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  filterAppointment = () => {
    const {appointmentList, isStarred} = this.state
    if (isStarred) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, isStarred} = this.state
    const filterList = this.filterAppointment()
    const starredColor = isStarred ? 'starred-ac-style' : 'starred-nr-style'

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-container">
            <form className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="input-title" className="input">
                Title
              </label>
              <input
                type="text"
                id="input-title"
                placeholder="Title"
                onChange={this.onTitle}
                value={title}
              />
              <label htmlFor="input-date" className="input">
                Date
              </label>
              <input
                type="date"
                id="input-date"
                onChange={this.onDate}
                value={date}
              />
              <br />
              <button
                type="submit"
                className="btn-style"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr className="hr-line" />
          <div className="bottom-container">
            <h1 className="bottom-para">Appointments</h1>
            <button
              type="button"
              className={starredColor}
              onClick={this.onStarred}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filterList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                onFavorite={this.onFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
