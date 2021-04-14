import './OpponentAthlete.css'

const OpponentAthlete = ({ opponent }) => {
  // console.log(opponent)

  // Selecting sport icon
  let sportIcon
  if (opponent.sport_name === 'soccer') {
    sportIcon = (
      <img
        className='iconSportOpponent'
        src={process.env.PUBLIC_URL + '/images/icons/sport_white/soccer.png'}
        alt='soccer'
      />
    )
  } else if (opponent.sport_name === 'basket') {
    sportIcon = (
      <img
        className='iconSportOpponent'
        src={process.env.PUBLIC_URL + '/images/icons/sport_white/basket.png'}
        alt='basket'
      />
    )
  } else if (opponent.sport_name === 'football') {
    sportIcon = (
      <img
        className='iconSportOpponent'
        src={process.env.PUBLIC_URL + '/images/icons/sport_white/football.png'}
        alt='football'
      />
    )
  } else if (opponent.sport_name === 'tennis') {
    sportIcon = (
      <img
        className='iconSportOpponent'
        src={process.env.PUBLIC_URL + '/images/icons/sport_white/tennis.png'}
        alt='tennis'
      />
    )
  } else if (opponent.sport_name === 'f1') {
    sportIcon = (
      <img
        className='iconSportOpponent'
        src={process.env.PUBLIC_URL + '/images/icons/sport_white/f1.png'}
        alt='f1'
      />
    )
  } else if (opponent.sport_name === 'motogp') {
    sportIcon = (
      <img
        className='iconSportOpponent'
        src={process.env.PUBLIC_URL + '/images/icons/sport_white/motogp.png'}
        alt='motogp'
      />
    )
  }

  // Fixing name length render
  let opponentName
  let updatedName
  if (opponent.name.short_name.length >= 15) {
    if (opponent.name.last_name.length <= 15) {
      updatedName = opponent.name.last_name
    } else {
      let nameArr = opponent.name.last_name.split('')
      if (nameArr.length > 16) {
        nameArr.splice(16, 10, '...')
        updatedName = nameArr.join('')
      } else {
        updatedName = opponent.name.last_name
      }
    }
  } else {
    updatedName = opponent.name.short_name
  }

  opponentName = (
    <p className='opponentName'>
      <span className='full-text'>{opponent.name.short_name}</span>
      <span className='short-text'>{updatedName}</span>
    </p>
  )

  // Rendering team or country
  let opponentTeamOrCountry
  if (opponent.sport_name === 'tennis') {
    opponentTeamOrCountry = opponent.country.short_name
  } else {
    opponentTeamOrCountry = opponent.next_event.team.short_name
  }

  // Rendering next event
  let opponentEvent
  if (opponent.sport_name === 'f1' || opponent.sport_name === 'motogp') {
    opponentEvent = (
      <p className='opponentEvent'>@ {opponent.next_event.name}</p>
    )
  } else {
    opponentEvent = (
      <p className='opponentEvent'>
        vs {opponent.next_event.opponent.short_name}
      </p>
    )
  }

  // Fixing cost
  let opponentCost = Math.floor(opponent.next_event.cost)
  if (opponentCost === 0) {
    opponentCost = 1
  } else if (opponentCost >= 10) {
    opponentCost = 10
  }
  return (
    <div className='OpponentAthlete'>
      <div className='OpponentAthleteJerseyContainer'>
        <img
          className='OpponentAthleteJersey'
          src={opponent.next_event.team.jersey}
          alt='Jersey'
        />
      </div>
      <div className='OpponentAthleteInfo'>
        <div className='OpponentNameTeamPos'>
          <div>{opponentName}</div>
          <p
            className='athleteTeamOrCountry'
            style={{
              backgroundColor: opponent.next_event.team.color_1,
              padding: '2.5px 0px',
              color: opponent.next_event.team.color_3,
            }}
          >
            {opponentTeamOrCountry}
          </p>

          {opponent.pos && (
            <p
              className='athletePos'
              style={{
                backgroundColor: opponent.next_event.team.color_2,
                padding: '2.5px 0px',
                color: opponent.next_event.team.color_4,
              }}
            >
              {opponent.pos}
            </p>
          )}
        </div>
        <div className='OpponentIconAndEvent'>
          {sportIcon}
          {/* opponent */}
          {/* eventDate&Time */}
          <div className='OpponentEventAndDate'>
            {opponentEvent} | 05/11 - 02.30
          </div>
        </div>
      </div>
      <div className='OpponentAthleteCost'>
        <p>{opponentCost} cr</p>
      </div>
    </div>
  )
}

export default OpponentAthlete
