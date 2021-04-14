import { useState } from 'react'
import './Calendar.css'
import eventsImported from '../events'

const Calendar = () => {
  const allSports = ['soccer', 'basket', 'tennis', 'football', 'f1', 'motogp']

  const updatedEvents = eventsImported.map((e) => {
    return {
      ...e,
      startingYear: parseInt(e.start_at.split(' ')[0].split('-')[0]),
      startingMonth: parseInt(e.start_at.split(' ')[0].split('-')[1]),
      startingDay: parseInt(e.start_at.split(' ')[0].split('-')[2]),
      startingHour: parseInt(e.start_at.split(' ')[1].split(':')[0]),
      startingMinute: parseInt(e.start_at.split(' ')[1].split(':')[1]),
      startingSecond: parseInt(e.start_at.split(' ')[1].split(':')[2]),
    }
  })

  updatedEvents
    .sort((a, b) => a.startingSecond - b.startingSecond)
    .sort((a, b) => a.startingMinute - b.startingMinute)
    .sort((a, b) => a.startingHour - b.startingHour)
    .sort((a, b) => a.startingDay - b.startingDay)
    .sort((a, b) => a.startingMonth - b.startingMonth)
    .sort((a, b) => a.startingYear - b.startingYear)

  const [events, setEvents] = useState(updatedEvents)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  let weekday = []
  weekday[0] = { name: 'Domenica', shortName: 'Dom' }
  weekday[1] = { name: 'Lunedi', shortName: 'Lun' }
  weekday[2] = { name: 'Martedi', shortName: 'Mar' }
  weekday[3] = { name: 'Mercoledi', shortName: 'Mer' }
  weekday[4] = { name: 'Giovedi', shortName: 'Gio' }
  weekday[5] = { name: 'Venerdi', shortName: 'Ven' }
  weekday[6] = { name: 'Sabato', shortName: 'Sab' }

  const weekdayToday = weekday[today.getDay()]
  const weekdayTomorrow = weekday[tomorrow.getDay()]

  let month = []
  month[0] = '01'
  month[1] = '02'
  month[2] = '03'
  month[3] = '04'
  month[4] = '05'
  month[5] = '06'
  month[6] = '07'
  month[7] = '08'
  month[8] = '09'
  month[9] = '10'
  month[10] = '11'
  month[11] = '12'

  const todayMonth = month[today.getMonth()]
  const tomorrowMonth = month[tomorrow.getMonth()]
  const todayNumber = today.getDate()
  const tomorrowNumber = tomorrow.getDate()
  const time = today.getHours() + ':' + today.getMinutes()

  const sportsEventArr = eventsImported.map((e) => e.sports_name)

  const sportsInCalendar = allSports.filter((sport) =>
    sportsEventArr.includes(sport)
  )

  let filteredSport = []
  const filterSport = (sport) => {
    if (!sport) return setEvents(updatedEvents)
    filteredSport = updatedEvents.filter((e) => e.sports_name === sport)

    setEvents(filteredSport)
  }

  console.log(events)

  let sportFilterIcons
  sportFilterIcons = sportsInCalendar.map((sport) => {
    return (
      <div
        key={sport}
        className='SportFilter'
        onClick={() => filterSport(sport)}
      >
        <img
          className='sportFilterIcon'
          src={process.env.PUBLIC_URL + `/images/icons/sport/${sport}.png`}
          alt='icon'
        />
      </div>
    )
  })

  return (
    <>
      <div className='CalendarFirstBackground'>
        <p className='CalendarTitle'>Calendario Eventi</p>
        <p className='CalendarTime'>
          {weekdayToday.name} {todayNumber}/{todayMonth} ore {time} -{' '}
          {weekdayTomorrow.name} {tomorrowNumber}/{tomorrowMonth} ore {time}
        </p>
        <div className='CalendarSportFilterContainer'>
          <div className='SportFilter' onClick={() => filterSport(null)}>
            <p>ALL</p>
          </div>
          {sportFilterIcons}
        </div>
      </div>
      <div className='CalendarSecondBackground'>
        {events.map((e) => (
          <div className='Event' key={e._id}>
            <div className='EventHeader'>
              <div className='EventSportIconLeague'>
                <img
                  className='EventSportIcon'
                  src={process.env.PUBLIC_URL + e.icon}
                  alt='icon'
                />
                <p className='EventSportLeague'>{e.league}</p>
              </div>
              <div className='EventSportDateTime'>
                <p className='EventSportTime'>
                  {e.startingDay}/
                  {e.startingMonth.toString().length === 1 ? (
                    <span>0{e.startingMonth}</span>
                  ) : (
                    e.startingMonth
                  )}
                </p>
                <span style={{ margin: '0 4px' }}>-</span>
                <p className='EventSportTime'>{e.time}</p>
              </div>
            </div>
            <div className='EventMain'>
              {e.sports_name === 'motogp' || e.sports_name === 'f1' ? (
                <p
                  style={{
                    backgroundColor: '#3a4653',
                    padding: '5px',
                    color: '#fff',
                    borderRadius: '10px',
                    width: 'fit-content',
                  }}
                >
                  {e.name}
                </p>
              ) : (
                <p>
                  <span
                    style={{
                      backgroundColor: e.first_team.color_1,
                      color: e.first_team.color_2,
                      padding: '5px',
                      borderRadius: '10px',
                      marginRight: '5px',
                    }}
                  >
                    {e.sports_name === 'soccer'
                      ? e.first_team.full_name.length >= 15
                        ? e.first_team.short_name
                        : e.first_team.full_name
                      : e.first_team.short_name}
                  </span>
                  -
                  <span
                    style={{
                      backgroundColor: e.second_team.color_1,
                      color: e.second_team.color_2,
                      padding: '5px',
                      borderRadius: '10px',
                      marginLeft: '5px',
                    }}
                  >
                    {e.sports_name === 'soccer'
                      ? e.second_team.full_name.length >= 15
                        ? e.second_team.short_name
                        : e.second_team.full_name
                      : e.second_team.short_name}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Calendar
