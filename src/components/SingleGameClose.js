import { Link } from 'react-router-dom'
import './SingleGameClose.css'

const SingleGameClose = ({ game }) => {
  let status
  if (game.status === 'to_start') {
    status = <p className='SingleGameCloseModify'>Modifica</p>
  }

  let sportsIcon
  let sportIcon

  sportsIcon = game.sportsArr.map((sport) => {
    const randomNumber = Math.random() * 1000
    sportIcon = (
      <img
        key={sport + randomNumber}
        className='SingleGameIconSport'
        src={process.env.PUBLIC_URL + `/images/icons/sport/${sport}.png`}
        alt={sport}
      />
    )
    return sportIcon
  })

  const hourEvent =
    game.firstEvent.startingHour.toString().length === 1
      ? `0${game.firstEvent.startingHour}`
      : game.firstEvent.startingHour

  const minuteEvent =
    game.firstEvent.startingMinute.toString().length === 1
      ? `0${game.firstEvent.startingMinute}`
      : game.firstEvent.startingMinute

  return (
    <div className='SingleGameClose'>
      <Link
        className='SingleGameLink'
        to={`/games/${game._id}`}
        onClick={() => localStorage.setItem('Game', JSON.stringify(game))}
      >
        <div className='SingleGameCloseFirstRow'>
          <div className='SingleGameCloseStatus'>{status}</div>
          <div className='SingleGameCloseSports'>{sportsIcon}</div>
          <div className='SingleGameCloseDate'>
            {game.firstEvent.startingDay}/
            {game.firstEvent.startingMonth.toString().length === 1 ? (
              <span>0{game.firstEvent.startingMonth}</span>
            ) : (
              game.firstEvent.startingMonth
            )}
          </div>
        </div>
        <div className='SingleGameCloseSecondRow'>
          <p className='SingleGameCloseUsername'>{game.user}</p>
          <div className='SingleGameCloseTimeOrResult'>
            {hourEvent}:{minuteEvent}
          </div>
          <p className='SingleGameCloseOpponent'>PC</p>
        </div>
      </Link>
    </div>
  )
}

export default SingleGameClose
