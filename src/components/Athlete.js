import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Athlete.css'
import Button from '../UI/Button'

const Athlete = ({ addAthlete, removeAthlete, athletes }) => {
  const teams = useSelector((state) => state.teams)
  const { userTeam } = teams
  const { teamCost } = teams

  const [updatedAthletes, setUpdatedAthletes] = useState(athletes)

  useEffect(() => {
    const newAthletes = athletes.map((athlete) => {
      if (athlete.pos === 'P' && athlete.sport_name === 'soccer') {
        let arrJersey = athlete.next_event.team.jersey.split('.')
        const arrJerseyFirst = arrJersey[0]
        const newJersey = arrJerseyFirst + '-gk.'
        const updatedJersey = newJersey.concat(arrJersey[1])
        return {
          ...athlete,
          next_event: {
            ...athlete.next_event,
            team: { ...athlete.next_event.team, jersey: updatedJersey },
          },
        }
      }
      return athlete
    })
    setUpdatedAthletes(newAthletes)
  }, [athletes])

  // console.log(updatedAthletes)

  const athlete = updatedAthletes.map((athlete) => {
    // Selecting sport icon
    let sportIcon = (
      <img
        className='iconSport'
        src={
          process.env.PUBLIC_URL +
          `/images/icons/sport/${athlete.sport_name}.png`
        }
        alt='sportIcon'
      />
    )

    // Fixing name length render
    let athleteName
    let updatedName
    if (athlete.name.short_name.length >= 17) {
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

    athleteName = (
      <p className='athleteName'>
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
      athleteEvent = <p className='athleteEvent'>@ {athlete.next_event.name}</p>
    } else {
      athleteEvent = (
        <p className='athleteEvent'>
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

    // Fixing FPPG
    let athleteFPPG = athlete.fppg.toFixed(2)

    // Checking if picked or not
    if (userTeam.length >= 1 && athlete._id === userTeam[0]._id) {
      athlete.picked = true
    } else if (userTeam.length >= 2 && athlete._id === userTeam[1]._id) {
      athlete.picked = true
    } else if (userTeam.length >= 3 && athlete._id === userTeam[2]._id) {
      athlete.picked = true
    } else if (userTeam.length >= 4 && athlete._id === userTeam[3]._id) {
      athlete.picked = true
    } else if (userTeam.length === 5 && athlete._id === userTeam[4]._id) {
      athlete.picked = true
    }

    // Rendering date & time event
    const startingMonth = athlete.next_event.start_at
      .split(' ')[0]
      .split('-')[1]

    const startingDay = athlete.next_event.start_at.split(' ')[0].split('-')[2]

    const startingHour = athlete.next_event.start_at.split(' ')[1].split(':')[0]

    const startingMinute = athlete.next_event.start_at
      .split(' ')[1]
      .split(':')[1]

    const hourEvent =
      startingHour.length === 1 ? `0${startingHour}` : startingHour

    const minuteEvent =
      startingMinute.toString().length === 1
        ? `0${startingMinute}`
        : startingMinute

    const dayEvent = startingDay.length === 1 ? `0${startingDay}` : startingDay

    const monthEvent =
      startingMonth.toString().length === 1
        ? `0${startingMonth}`
        : startingMonth

    const gameTime = `${hourEvent}:${minuteEvent}`
    const gameDate = `${dayEvent}/${monthEvent}`

    // onClickBtn
    const addAthleteHandler = () => {
      if (userTeam.length >= 5) return

      const budget = 25 - teamCost
      let realCost = Math.floor(athlete.next_event.cost)
      if (realCost > 10) {
        realCost = 10
      } else if (realCost <= 0) {
        realCost = 1
      }

      if (budget < realCost) return

      if (userTeam.length === 1) {
        if (budget - 3 < realCost) return
      } else if (userTeam.length === 2) {
        if (budget - 2 < realCost) return
      } else if (userTeam.length === 3) {
        if (budget - 1 < realCost) return
      }

      athlete.picked = true

      // 3) Pushing athlete to Lineup
      addAthlete(athlete, teamCost)
    }

    const removeAthleteHandler = () => {
      athlete.picked = false
      removeAthlete(athlete)
    }

    return (
      <div className='Athlete' key={athlete._id}>
        <div className='athleteRow'>
          <Link className='AthleteLink' to={`/athlete/${athlete._id}`}>
            <div className='iconCol'>{sportIcon}</div>
            <div className='athleteCol'>
              <div className='athleteNameTeamPos'>
                {athleteName}
                <p
                  className='athleteTeamOrCountry'
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
                    className='athletePos'
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
              <p className='athleteDate'>
                {gameDate} - {gameTime}
              </p>
            </div>
            <div className='costFPPGCol'>
              <p className='athleteCost'>{athleteCost} cr</p>
              <p className='athleteFPPG'>
                FPPG: <span>{athleteFPPG}</span>
              </p>
            </div>
          </Link>
          <div className='btnCol'>
            {!athlete.picked && (
              <Button className='Button Add' clicked={addAthleteHandler}>
                +
              </Button>
            )}
            {athlete.picked && (
              <Button className='Button Remove' clicked={removeAthleteHandler}>
                -
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  })

  return athlete
}

export default Athlete
