import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import athletes from '../athletes'
import Header from '../UI/Header'
import Button from '../UI/Button'
import './AthleteDetails.css'
import {
  addToTeam,
  removeFromTeam,
  createOpponentTeam,
} from '../actions/athleteActions'

const AthleteDetails = ({ history, match }) => {
  const [isStats, setIsStats] = useState(true)
  const dispatch = useDispatch()
  const teams = useSelector((state) => state.teams)
  let { userTeam, opponentTeam, teamCost } = teams

  let budget = 25 - teamCost

  if (userTeam.length === 1) {
    budget = budget - 3
  } else if (userTeam.length === 2) {
    budget = budget - 2
  } else if (userTeam.length === 3) {
    budget = budget - 1
  }

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
  }, [])

  const athlete = updatedAthletes.find((ath) => ath._id === match.params.id)

  console.log(athlete)

  let athleteInTeam

  if (userTeam) {
    athleteInTeam = userTeam.find((ath) => ath._id === athlete._id)
  }

  let userCost = Math.floor(athlete.next_event.cost)
  if (userCost >= 10) {
    userCost = 10
  } else if (userCost <= 1) {
    userCost = 1
  }

  athlete.userCost = userCost

  let backgroundColor

  if (athlete.sport_name === 'basket') {
    backgroundColor = 'linear-gradient(#CC440B, #F68658)'
  } else if (
    athlete.sport_name === 'soccer' ||
    athlete.sport_name === 'football'
  ) {
    backgroundColor = 'linear-gradient(#196e51, #2ed099)'
  } else if (athlete.sport_name === 'tennis') {
    backgroundColor = 'linear-gradient(#33649e, #82a9d7)'
  } else {
    backgroundColor = 'linear-gradient(#111, #555)'
  }

  // Fixing uniform number
  let athleteNum

  if (athlete.num) {
    athleteNum = (
      <p
        style={{
          fontFamily: 'Quantico, sans-serif',
          position: 'absolute',
          top:
            athlete.sport_name === 'football'
              ? '50px'
              : athlete.sport_name === 'basket'
              ? '35px'
              : athlete.sport_name === 'soccer'
              ? '30px'
              : '30px',
          zIndex: '100',
          fontSize: '32px',
          color: athlete.next_event.team.color_jrs,
          letterSpacing: '-3px',
        }}
      >
        {athlete.num}
      </p>
    )
  }

  // Fixing uniform name
  let uniformName
  let uniformNameTxt = athlete.name.uniform_name

  if (athlete.sport_name === 'motogp' || athlete.sport_name === 'f1') {
    uniformNameTxt = ''
  }

  uniformName = (
    <p
      style={{
        fontFamily: 'Quantico, sans-serif',
        textTransform: 'uppercase',
        position: 'absolute',
        top:
          athlete.sport_name === 'football'
            ? '40px'
            : athlete.sport_name === 'basket'
            ? '20px'
            : athlete.sport_name === 'soccer'
            ? '17px'
            : '18px',
        zIndex: '100',
        fontSize: '13px',
        color: athlete.next_event.team.color_jrs,
        padding: '0 3px',
        textAlign: 'center',
        backgroundColor:
          uniformNameTxt.length >= 7 && athlete.next_event.team.color_sqr,
        borderRadius: uniformNameTxt.length >= 7 && '5px',
        letterSpacing: '-1px',
      }}
    >
      {uniformNameTxt}
    </p>
  )

  // Rendering team or country
  let athleteTeamOrCountry

  let styleAthleteTeamOrCountry = (x, y) => {
    if (athlete.sport_name === 'tennis') {
      if (athlete.country.name.length >= 18) {
        return x
      } else {
        return y
      }
    } else {
      if (athlete.next_event.team.full_name.length >= 18) {
        return x
      } else {
        return y
      }
    }
  }

  athleteTeamOrCountry = (
    <p
      style={{
        backgroundColor: athlete.next_event.team.color_1,
        padding: styleAthleteTeamOrCountry('2.5px 5px', '2.5px 10px'),
        color: athlete.next_event.team.color_3,
        fontWeight: '500',
        borderRadius: '10px',
        border: '3px solid',
        borderColor: athlete.next_event.team.color_3,
        marginRight: styleAthleteTeamOrCountry('2px', '5px'),
        fontSize: styleAthleteTeamOrCountry('14px', '15px'),
        letterSpacing: '-.3px',
      }}
    >
      {athlete.sport_name === 'tennis'
        ? athlete.country.name
        : athlete.next_event.team.full_name}
    </p>
  )

  let styleOpponent = (x, y) => {
    if (athlete.next_event.opponent.full_name.length >= 17) {
      return x
    } else {
      return y
    }
  }

  // Rendering next event
  let athleteEvent
  if (athlete.sport_name === 'f1' || athlete.sport_name === 'motogp') {
    athleteEvent = (
      <p>
        @
        <span
          style={{
            backgroundColor: '#fdfdfd',
            padding: '2.5px 10px',
            color: '#111',
            fontWeight: '500',
            borderRadius: '10px',
            border: '3px solid',
            borderColor: '#111',
            marginRight: '10px',
            marginLeft: '5px',
            fontSize: '13px',
            letterSpacing: '-.5px',
          }}
        >
          {athlete.next_event.name}
        </span>
      </p>
    )
  } else {
    athleteEvent = (
      <p>
        vs
        <span
          style={{
            backgroundColor: athlete.next_event.opponent.color_1,
            // padding: '2.5px 10px',
            color: athlete.next_event.opponent.color_3,
            borderRadius: '10px',
            border: '3px solid',
            borderColor: athlete.next_event.opponent.color_3,
            // marginRight: '10px',
            marginLeft: styleOpponent('2px', '5px'),
            // fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '-.5px',
            padding: styleOpponent('2.5px 5px', '2.5px 10px'),
            marginRight: styleOpponent('2px', '5px'),
            fontSize: styleOpponent('13px', '14px'),
          }}
        >
          {athlete.next_event.opponent.full_name}
        </span>
      </p>
    )
  }

  const addAthleteOnTeamHandler = (athlete) => {
    const updatedTeam = [...userTeam]
    updatedTeam.push(athlete)
    userTeam = updatedTeam
    dispatch(addToTeam(athlete))
    localStorage.setItem('userTeam', JSON.stringify(updatedTeam))
    history.goBack()
  }

  const removeAthleteFromTeamHandler = (athlete) => {
    const updatedTeam = [...userTeam]
    const newTeam = updatedTeam.filter((ath) => {
      return ath._id !== athlete._id
    })
    userTeam = newTeam
    dispatch(removeFromTeam(athlete))
    localStorage.setItem('userTeam', JSON.stringify(newTeam))
    opponentTeam = []
    dispatch(createOpponentTeam(opponentTeam))
    history.goBack()
  }

  // Rendering button
  let button

  if (!athleteInTeam && userTeam.length < 5 && athlete.userCost <= budget) {
    button = (
      <Button
        className='AthleteDetailsBtnAdd'
        clicked={() => addAthleteOnTeamHandler(athlete)}
      >
        SCHIERA ATLETA
      </Button>
    )
  } else if (athleteInTeam) {
    button = (
      <Button
        className='AthleteDetailsBtnRemove'
        clicked={() => removeAthleteFromTeamHandler(athlete)}
      >
        RIMUOVI ATLETA
      </Button>
    )
  } else if (userTeam.length === 5 && !athleteInTeam) {
    button = (
      <Button className='AthleteDetailsBtnDisabled'>
        FORMAZIONE AL COMPLETO
      </Button>
    )
  } else if (
    !athleteInTeam &&
    userTeam.length < 5 &&
    athlete.userCost > budget
  ) {
    button = (
      <Button className='AthleteDetailsBtnDisabled'>
        BUDGET NON SUFFICIENTE
      </Button>
    )
  } else {
    button = (
      <Button className='AthleteDetailsBtnDisabled'>
        ATLETA NON DISPONIBILE
      </Button>
    )
  }

  // Rendering Cost
  let cost
  if (!athleteInTeam) {
    cost = (
      <p
        style={{
          backgroundColor: '#fff',
          padding: styleAthleteTeamOrCountry('2.5px 5px', '2.5px 10px'),
          color: '#2ed099',
          fontWeight: '500',
          borderRadius: '10px',
          border: '3px solid',
          borderColor: '#2ed099',
          letterSpacing: '-1px',
          fontSize: styleAthleteTeamOrCountry('14px', '15px'),
        }}
      >
        {athlete.userCost} cr
      </p>
    )
  } else if (!athleteInTeam) {
    cost = (
      <p
        style={{
          backgroundColor: '#fff',
          padding: styleAthleteTeamOrCountry('2.5px 5px', '2.5px 10px'),
          color: '#2ed099',
          fontWeight: '500',
          borderRadius: '10px',
          border: '3px solid',
          borderColor: '#2ed099',
          letterSpacing: '-1px',
          fontSize: styleAthleteTeamOrCountry('14px', '15px'),
        }}
      >
        {athlete.userCost} cr
      </p>
    )
  } else if (athleteInTeam) {
    cost = (
      <p
        style={{
          backgroundColor: '#fff',
          padding: styleAthleteTeamOrCountry('2.5px 5px', '2.5px 10px'),
          color: '#ec3336',
          fontWeight: '500',
          borderRadius: '10px',
          border: '3px solid',
          borderColor: '#ec3336',
          letterSpacing: '-1px',
          fontSize: styleAthleteTeamOrCountry('14px', '15px'),
        }}
      >
        {athlete.userCost} cr
      </p>
    )
  }

  console.log(athlete.past_events)

  let tableHeadersUpdated
  let table

  if (athlete.past_events) {
    const tableHeaders = Object.entries(
      athlete.past_events[0].event_data.fanta
    ).map(([key, value]) => key)

    tableHeaders.unshift('date', 'event', 'tot')

    tableHeadersUpdated = tableHeaders.map((header) => {
      let shortName
      let italianV
      if (header === 'date') {
        shortName = 'Data'
        italianV = 'Data'
      } else if (header === 'event') {
        shortName = 'Evento'
        italianV = 'Evento`'
      } else if (header === 'tot') {
        shortName = 'Tot'
        italianV = 'Totale'
      } else if (header === 'has_gk') {
        shortName = 'Por'
        italianV = 'Portiere'
      } else if (header === 'has_def') {
        shortName = 'Dif'
        italianV = 'Difensore'
      } else if (header === 'goal') {
        shortName = 'Gol'
        italianV = 'Goal'
      } else if (header === 'assist') {
        shortName = 'Ass'
        italianV = 'Assist'
      } else if (header === 'yellowCards') {
        shortName = 'Amm'
        italianV = 'Ammonizione'
      } else if (header === 'redCards') {
        shortName = 'Esp'
        italianV = 'Espulso'
      } else if (header === 'ownGoal') {
        shortName = 'Own'
        italianV = 'Autogol'
      } else if (header === 'teamWon') {
        shortName = 'Win'
        italianV = 'Vittoria'
      } else if (header === 'goals_conceded') {
        shortName = 'GSb'
        italianV = 'Gol Subiti'
      } else if (header === 'goals_own_team') {
        shortName = 'GSq'
        italianV = 'Gol di Squadra'
      } else if (header === 'clean_sheet') {
        shortName = 'CS'
        italianV = 'Clean Sheet'
      } else if (header === 'pen_save') {
        shortName = 'RP'
        italianV = 'Rigore Parato'
      } else if (header === 'pen_committed') {
        shortName = 'RC'
        italianV = 'Rigore Causato'
      } else if (header === 'pen_won') {
        shortName = 'RG'
        italianV = 'Rigore Guadagnato'
      } else if (header === 'pen_miss') {
        shortName = 'RS'
        italianV = 'Rigore Sbagliato'
      } else if (header === 'shots_total') {
        shortName = 'TT'
        italianV = 'Tiri Totali'
      } else if (header === 'shots_on_goal') {
        shortName = 'TPr'
        italianV = 'Tiri In Porta'
      } else if (header === 'correct_passes') {
        shortName = 'PR'
        italianV = 'Passaggi Riusciti'
      } else if (header === 'missed_passes') {
        shortName = 'PS'
        italianV = 'Passaggi Sbagliati'
      } else if (header === 'keyPasses') {
        shortName = 'PK'
        italianV = 'Passaggi Chiave'
      } else if (header === 'acc_crosses') {
        shortName = 'CR'
        italianV = 'Cross Riusciti'
      } else if (header === 'missed_crosses') {
        shortName = 'CS'
        italianV = 'Cross Sbagliati'
      } else if (header === 'dribbleSucc') {
        shortName = 'DR'
        italianV = 'Dribbling Riusciti'
      } else if (header === 'def_int') {
        shortName = 'Int'
        italianV = 'Interventi Difensivi'
      } else if (header === 'hit_woodwork') {
        shortName = 'PT'
        italianV = 'Pali e Traverse'
      } else if (header === 'saves') {
        shortName = 'Par'
        italianV = 'Parate'
      } else if (header === 'savesInsideBox') {
        shortName = 'PiA'
        italianV = 'Parate in Area'
      } else if (header === 'fouls_drawn') {
        shortName = 'FS'
        italianV = 'Falli Subiti'
      } else if (header === 'fouls_commited') {
        shortName = 'FC'
        italianV = 'Falli Commessi'
      }
      return { name: header, shortName, italianV }
    })

    // console.log(tableHeadersUpdated)

    if (athlete.sport_name === 'soccer') {
      table = athlete.past_events.map((match) => {
        const soccerFanta = Object.entries(match.event_data.fanta).map(
          ([key, value]) => {
            return { key, value }
          }
        )

        const soccerStats = Object.entries(match.event_data.stats).map(
          ([key, value]) => {
            return { key, value }
          }
        )

        // console.log(soccerStats)
        return (
          <tr key={match.event_info.event_date}>
            <td>{match.event_info.event_date}</td>
            <td>
              <span
                style={{
                  borderRadius: '20px',
                  backgroundColor: match.event_info.opponent.color_1,
                  color: match.event_info.opponent.color_2,
                  border: '1px solid',
                  borderColor: match.event_info.opponent.color_2,
                  padding: '5px',
                }}
              >
                {match.event_info.opponent.short_name}
              </span>
            </td>
            <td>
              <span
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#353a3f',
                  color: '#fff',
                  padding: '5px',
                }}
              >
                {match.event_info.rating}
              </span>
            </td>
            {isStats
              ? soccerStats.map((stats) => (
                  <td key={stats.key}>{stats.value}</td>
                ))
              : soccerFanta.map((stats) => (
                  <td key={stats.key}>{stats.value}</td>
                ))}
          </tr>
        )
      })
    }
  }

  const toggleStatsFanta = () => setIsStats(!isStats)

  return (
    <div className='AthleteDetails'>
      <div
        style={{
          height: '243px',
          background: backgroundColor,
        }}
      >
        <Header
          className='HeaderAthleteDetails'
          page='AthleteDetails'
          title='Scheda Atleta'
          subtitle={`${athlete.name.first_name} ${athlete.name.last_name}`}
          clicked={() => history.goBack()}
        />
        <div className='AthleteDetailsFirstRow'>
          <div className='AthleteDetailsImg'>
            <div className='AthleteDetailsPentagon'>
              <div
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  height: '105px',
                  width: '105px',
                  backgroundColor: athlete.next_event.team.color_2,
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              ></div>

              <div
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  height: '95px',
                  width: '95px',
                  backgroundColor: athlete.next_event.team.color_1,
                  position: 'absolute',
                  top: '5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              ></div>
            </div>
            <div className='AthleteDetailsJerseyNameAndNumber'>
              {uniformName}
              {athleteNum}
              <img
                style={{
                  width: '90px',
                  height: '115px',
                  position: 'absolute',
                  top:
                    athlete.sport_name === 'f1' ||
                    athlete.sport_name === 'football'
                      ? '-5px'
                      : '0px',
                }}
                src={athlete.next_event.team.jersey}
                alt='Jersey'
              />
            </div>
            <div
              style={{
                height: '5px',
                width: '66px',
                backgroundColor: athlete.next_event.team.color_2,
                position: 'absolute',
                top: '100px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            ></div>
          </div>
        </div>
        <p className='AthleteDetailsName'>
          {athlete.name.first_name} {athlete.name.last_name}
        </p>
      </div>
      <div className='AthleteDetailsInfo'>
        <div className='AthleteDetailsInfoFirstRow'>
          {athleteTeamOrCountry}
          {athlete.pos && (
            <p
              className='athleteDetailsPos'
              style={{
                backgroundColor: athlete.next_event.team.color_2,
                padding: styleAthleteTeamOrCountry('2.5px 5px', '2.5px 10px'),
                color: athlete.next_event.team.color_4,
                fontWeight: '500',
                borderRadius: '10px',
                border: '3px solid',
                borderColor: athlete.next_event.team.color_4,
                marginRight: styleAthleteTeamOrCountry('2px', '5px'),
                fontSize: styleAthleteTeamOrCountry('14px', '15px'),
                letterSpacing: '-.5px',
              }}
            >
              {athlete.pos}
            </p>
          )}
          {cost}
        </div>
        <div className='AthleteDetailsInfoSecondRow'>
          {athleteEvent}
          <span>| sab 05/11 - 02.30</span>
        </div>
        <div className='AthleteDetailsInfoThirdRow'>{button}</div>
      </div>
      <div
        className={
          athlete.past_events
            ? 'SecondBackgroundWithStats'
            : 'SecondBackgroundWithoutStats'
        }
      >
        <div className='AthleteGeneralStatsContainer'>
          <div className='AthleteGeneralStats'>
            <p className='AthleteGeneralStatsTitle'>Presenze</p>
            <p className='AthleteGeneralStatsNumber'>12</p>
          </div>
          <div className='AthleteGeneralStats'>
            <p className='AthleteGeneralStatsTitle'>FPPG</p>
            <p className='AthleteGeneralStatsNumber'>17.65</p>
          </div>
          <div className='AthleteGeneralStats'>
            <p className='AthleteGeneralStatsTitle'>Sport Rank</p>
            <p className='AthleteGeneralStatsNumber'>
              1
              {/* <span style={{ fontSize: '20px', marginLeft: '-3px' }}>/</span>
              <span style={{ fontSize: '10px' }}>1.300</span> */}
            </p>
          </div>
          <div className='AthleteGeneralStats'>
            <p className='AthleteGeneralStatsTitle'>Gen Rank</p>
            <p className='AthleteGeneralStatsNumber'>
              13000
              {/* <span style={{ fontSize: '20px', marginLeft: '-3px' }}>/</span>
              <span style={{ fontSize: '10px' }}>130.300</span> */}
            </p>
          </div>
        </div>
        {athlete.past_events && (
          <div className='AthleteGameRecap'>
            <div className='AthleteGameRecapHeader'>
              <p className='AthleteGameRecapTitle'>Game Recap</p>
              <div className='AthleteGameRecapToggle'>
                <p
                  className={isStats ? 'AthleteGameRecapToggleActive' : null}
                  onClick={toggleStatsFanta}
                >
                  STATS
                </p>
                <p
                  className={!isStats ? 'AthleteGameRecapToggleActive' : null}
                  onClick={toggleStatsFanta}
                >
                  FANTA
                </p>
              </div>
            </div>
            <div className='AthleteGameRecapTable'>
              <div className='TableContainer'>
                <table className='Table'>
                  <thead>
                    <tr>
                      {tableHeadersUpdated.map((header) => (
                        <th key={header.name}>{header.shortName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{table}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AthleteDetails
