import { Link } from 'react-router-dom'
import './AthleteSingleGameRight.css'

const AthleteSingleGameRight = ({ athlete }) => {
  // Fixing name length render
  let athleteName
  let updatedName
  if (athlete.name.short_name.length >= 16) {
    if (athlete.name.last_name.length <= 13) {
      updatedName = athlete.name.last_name
    } else {
      let nameArr = athlete.name.last_name.split('')
      if (nameArr.length > 13) {
        nameArr.splice(13, 10, '...')
        updatedName = nameArr.join('')
      } else {
        updatedName = athlete.name.last_name
      }
    }
  } else {
    updatedName = athlete.name.short_name
  }

  athleteName = (
    <p className='AthleteSingleGameNameRight'>
      <span className='full-text'>{athlete.name.short_name}</span>
      <span className='short-text'>{updatedName}</span>
    </p>
  )

  // Rendering team or country
  let athleteTeamOrCountry
  if (athlete.sport_name === 'tennis') {
    athleteTeamOrCountry = athlete.country.short_name
  } else {
    athleteTeamOrCountry = athlete.next_event.team.short_name
  }

  // Rendering next event
  let athleteEvent
  if (athlete.sport_name === 'f1' || athlete.sport_name === 'motogp') {
    athleteEvent = (
      <p className='AthleteSingleGameEventRight'>@ {athlete.next_event.name}</p>
    )
  } else {
    athleteEvent = (
      <p className='AthleteSingleGameEventRight'>
        vs {athlete.next_event.opponent.short_name}
      </p>
    )
  }

  const startingMonth = athlete.next_event.start_at.split(' ')[0].split('-')[1]

  const startingDay = athlete.next_event.start_at.split(' ')[0].split('-')[2]

  const startingHour = athlete.next_event.start_at.split(' ')[1].split(':')[0]

  const startingMinute = athlete.next_event.start_at.split(' ')[1].split(':')[1]

  const hourEvent =
    startingHour.length === 1 ? `0${startingHour}` : startingHour

  const minuteEvent =
    startingMinute.toString().length === 1
      ? `0${startingMinute}`
      : startingMinute

  const dayEvent = startingDay.length === 1 ? `0${startingDay}` : startingDay

  const monthEvent =
    startingMonth.toString().length === 1 ? `0${startingMonth}` : startingMonth

  const gameTime = `${hourEvent}:${minuteEvent}`
  const gameDate = `${dayEvent}/${monthEvent}`

  return (
    <div className='AthleteSingleGameRight'>
      <div className='AthleteSingleGameResultOrTimeRight'>
        <p className='AthleteSingleGameTime'>{gameTime}</p>
        <p className='AthleteSingleGameDate'>{gameDate}</p>
      </div>
      <Link
        className='AthleteLink AthleteLinkRight'
        to={`/athlete/${athlete._id}`}
      >
        <div className='AthleteSingleGameNameTeamPosEvent'>
          {athleteName}
          <div className='AthleteSingleGameTeamPosContainerRight'>
            <p
              className='AthleteSingleGameTeamOrCountry'
              style={{
                backgroundColor: athlete.next_event.team.color_1,
                padding: '2.5px 0px',
                color: athlete.next_event.team.color_3,
              }}
            >
              {athleteTeamOrCountry}
            </p>

            {athlete.pos && (
              <p
                className='AthleteSingleGamePos'
                style={{
                  backgroundColor: athlete.next_event.team.color_2,
                  padding: '2.5px 0px',
                  color: athlete.next_event.team.color_4,
                }}
              >
                {athlete.pos}
              </p>
            )}
          </div>
          {athleteEvent}
        </div>
        <img
          className='AthleteSingleGameJerseyRight'
          src={athlete.next_event.team.jersey}
          alt='Jersey'
        />
      </Link>
    </div>
  )
}

export default AthleteSingleGameRight
