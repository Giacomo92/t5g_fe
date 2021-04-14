import { Link } from 'react-router-dom'
import './AthleteOnField.css'

const AthleteOnField = ({ athlete }) => {
  // Fixing uniform number
  let athleteNum

  if (athlete.num) {
    if (athlete.sport_name === 'football') {
      athleteNum = (
        <p
          style={{
            fontFamily: 'Quantico, sans-serif',
            position: 'absolute',
            top: '47px',
            zIndex: '100',
            fontSize: '23px',
            color: athlete.next_event.team.color_jrs,
          }}
        >
          {athlete.num}
        </p>
      )
    } else {
      athleteNum = (
        <p
          style={{
            fontFamily: 'Quantico, sans-serif',
            position: 'absolute',
            top: '26px',
            zIndex: '100',
            fontSize: '23px',
            color: athlete.next_event.team.color_jrs,
          }}
        >
          {athlete.num}
        </p>
      )
    }
  }

  // Fixing uniform name
  let uniformNameTxt = athlete.name.uniform_name
  let uniformName

  if (athlete.sport_name === 'motogp' || athlete.sport_name === 'f1') {
    uniformNameTxt = ''
  }

  let nameArr = []
  if (uniformNameTxt.length > 17) {
    nameArr = uniformNameTxt.split('')
    nameArr.splice(17, 10, '...')
    uniformNameTxt = nameArr.join('')
  }

  if (uniformNameTxt.length > 6) {
    // disegniamo riquadro con colorJrs e colorSqdr
    if (athlete.sport_name === 'football') {
      uniformName = (
        <p
          style={{
            fontFamily: 'Quantico, sans-serif',
            textTransform: 'uppercase',
            position: 'absolute',
            top: '40px',
            zIndex: '100',
            fontSize: '10px',
            color: athlete.next_event.team.color_jrs,
            maxWidth: '120px',
            padding: '0 3px',
            textAlign: 'center',
            backgroundColor: athlete.next_event.team.color_sqr,
            borderRadius: '5px',
          }}
        >
          {uniformNameTxt}
        </p>
      )
    } else {
      uniformName = (
        <p
          style={{
            fontFamily: 'Quantico, sans-serif',
            textTransform: 'uppercase',
            position: 'absolute',
            top: '15px',
            zIndex: '100',
            fontSize: '10px',
            color: athlete.next_event.team.color_jrs,
            maxWidth: '120px',
            padding: '0 3px',
            textAlign: 'center',
            backgroundColor: athlete.next_event.team.color_sqr,
            borderRadius: '5px',
          }}
        >
          {uniformNameTxt}
        </p>
      )
    }
  } else {
    if (athlete.sport_name === 'football') {
      uniformName = (
        <p
          style={{
            fontFamily: 'Quantico, sans-serif',
            textTransform: 'uppercase',
            position: 'absolute',
            top: '40px',
            zIndex: '100',
            fontSize: '10px',
            color: athlete.next_event.team.color_jrs,
            maxWidth: '120px',
            padding: '0 3px',
            textAlign: 'center',
          }}
        >
          {uniformNameTxt}
        </p>
      )
    } else {
      uniformName = (
        <p
          style={{
            fontFamily: 'Quantico, sans-serif',
            textTransform: 'uppercase',
            position: 'absolute',
            top: '15px',
            zIndex: '100',
            fontSize: '10px',
            color: athlete.next_event.team.color_jrs,
            maxWidth: '120px',
            padding: '0 3px',
            textAlign: 'center',
          }}
        >
          {uniformNameTxt}
        </p>
      )
    }
  }

  // Fixing sport icon
  let sportIcon = (
    <img
      className='AthleteOnTeamIcon'
      src={
        process.env.PUBLIC_URL + `/images/icons/sport/${athlete.sport_name}.png`
      }
      alt='sportIcon'
    />
  )

  // Fixing name length on infocard
  let updatedName
  if (athlete.name.short_name.length >= 16) {
    if (athlete.name.last_name.length <= 15) {
      updatedName = athlete.name.last_name
    } else {
      let nameArr = athlete.name.last_name.split('')
      if (nameArr.length > 14) {
        nameArr.splice(14, 10, '...')
        updatedName = nameArr.join('')
      } else {
        updatedName = athlete.name.last_name
      }
    }
  } else {
    updatedName = athlete.name.short_name
  }

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
      <p className='AthleteOnTeamEvent'>
        @{' '}
        <span style={{ textTransform: 'uppercase' }}>
          {athlete.next_event.name.split(' ')[1].split('').slice(0, 3).join('')}
        </span>
      </p>
    )
  } else {
    athleteEvent = (
      <p className='AthleteOnTeamEvent'>
        vs {athlete.next_event.opponent.short_name}
      </p>
    )
  }

  // Fixing cost
  let athleteCost = Math.floor(athlete.next_event.cost)
  if (athleteCost === 0) {
    athleteCost = 1
  } else if (athleteCost >= 10) {
    athleteCost = 10
  }

  return (
    <Link className='AthleteOnFieldLink' to={`/athlete/${athlete._id}`}>
      <div className='AthleteOnField'>
        <div className='Pentagon'>
          <div
            style={{
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              height: '85px',
              width: '85px',
              backgroundColor: athlete.next_event.team.color_2,
              position: 'absolute',
              top: '0',
            }}
          ></div>
          <div
            style={{
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              height: '75px',
              width: '75px',
              backgroundColor: athlete.next_event.team.color_1,
              position: 'absolute',
              top: '5px',
              left: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></div>
        </div>
        <div className='JerseyNameAndNumber'>
          {uniformName}
          {athleteNum}

          <img
            className='Jersey'
            src={athlete.next_event.team.jersey}
            alt='Jersey'
          />
        </div>

        <div className='RectangleInfoPlayer'>
          <p className='AthleteOnTeamName'>{updatedName}</p>
          <div className='Wrapper'>
            {sportIcon}

            <div className='AthleteOnTeamTeamAndPos'>
              <p
                className='athleteOnTeamTeamOrCountry'
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
                  className='athleteOnTeamPos'
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
            <p className='AthleteOnTeamCost'>{athleteCost}</p>
          </div>
          <div className='AthleteOnTeamEventAndDate'>
            {athleteEvent} | 05/11 - 02.30
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AthleteOnField
