import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './Games.css'
import Navbar from '../UI/Navbar'
import Header from '../UI/Header'
import { ReactComponent as Live } from '../svg/live-2.svg'
import { ReactComponent as Planned } from '../svg/calendar-2.svg'
import { ReactComponent as Done } from '../svg/strategy.svg'
import SingleGameClose from './SingleGameClose'
import { getGames } from '../actions/gamesActions'
import Spinner from '../UI/Spinner'

const Games = () => {
  const dispatch = useDispatch()
  // const { loading } = useSelector((state) => state.gamesList)
  const [games, setGames] = useState()
  const [loadingGames, setIsLoadingGames] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [isPlanned, setIsPlanned] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const fetchGames = async () => {
      const res = await axios(
        'https://the5game-default-rtdb.firebaseio.com/games.json'
      )
      if (res.data) {
        const gamesFetched = Object.entries(res.data).map(([key, value]) => {
          return { ...value, _id: key }
        })

        const gamesUpdated = gamesFetched.map((game) => {
          const sportsArr = game.team.map((ath) => ath.sport_name)

          const timeTeamArr = game.team.map((ath) => ath.next_event.start_at)
          const timeOppArr = game.opponent.map((ath) => ath.next_event.start_at)
          const timeArr = timeTeamArr.concat(timeOppArr)

          const timeObj = timeArr.map((e) => {
            return {
              eventDate: e,
              startingYear: parseInt(e.split(' ')[0].split('-')[0]),
              startingMonth: parseInt(e.split(' ')[0].split('-')[1]),
              startingDay: parseInt(e.split(' ')[0].split('-')[2]),
              startingHour: parseInt(e.split(' ')[1].split(':')[0]),
              startingMinute: parseInt(e.split(' ')[1].split(':')[1]),
              startingSecond: parseInt(e.split(' ')[1].split(':')[2]),
            }
          })

          timeObj
            .sort((a, b) => a.startingSecond - b.startingSecond)
            .sort((a, b) => a.startingMinute - b.startingMinute)
            .sort((a, b) => a.startingHour - b.startingHour)
            .sort((a, b) => a.startingDay - b.startingDay)
            .sort((a, b) => a.startingMonth - b.startingMonth)
            .sort((a, b) => a.startingYear - b.startingYear)

          const firstEvent = timeObj[0]
          return { ...game, sportsArr, firstEvent }
        })
        setGames(gamesUpdated)
        dispatch(getGames(gamesUpdated))
        setIsLoadingGames(false)
      } else {
        setGames()
        setIsLoadingGames(false)
      }
    }

    fetchGames()
  }, [dispatch])

  // const auth = useSelector((state) => state.auth)
  // const { user } = auth

  // if (!loading) {
  //   console.log(games)
  // }

  const showLive = () => {
    setIsLive(true)
    setIsPlanned(false)
    setIsFinished(false)
  }

  const showPlanned = () => {
    setIsPlanned(true)
    setIsLive(false)
    setIsFinished(false)
  }

  const showFinished = () => {
    setIsFinished(true)
    setIsLive(false)
    setIsPlanned(false)
  }

  let attachedClasses = ['MenuGamesLink', 'Close']
  let attachedClassesLive = []
  let attachedClassesPlanned = []
  let attachedClassesFinished = []

  if (isLive) {
    attachedClassesLive = ['MenuGamesLink', 'Live']
  }
  if (isPlanned) {
    attachedClassesPlanned = ['MenuGamesLink', 'Planned']
  }
  if (isFinished) {
    attachedClassesFinished = ['MenuGamesLink', 'Finished']
  }

  let subtitle
  if (isLive) subtitle = 'Live'
  if (isPlanned) subtitle = 'In Programma'
  if (isFinished) subtitle = 'Concluse'

  return (
    <>
      <div className='Games'>
        <Header
          page='Games'
          title='Partite'
          subtitle={subtitle}
          className='HeaderHome'
        />
        <div className='MenuGames'>
          <div
            className={
              isLive ? attachedClassesLive.join(' ') : attachedClasses.join(' ')
            }
            onClick={showLive}
          >
            <Live className='MenuIcon' />
            <p>Live</p>
          </div>
          <div
            className={
              isPlanned
                ? attachedClassesPlanned.join(' ')
                : attachedClasses.join(' ')
            }
            onClick={showPlanned}
          >
            <Planned className='MenuIcon' />
            <p>In Programma</p>
          </div>

          <div
            className={
              isFinished
                ? attachedClassesFinished.join(' ')
                : attachedClasses.join(' ')
            }
            onClick={showFinished}
          >
            <Done className='MenuIcon' />
            <p>Concluse</p>
          </div>
        </div>
        {/* {!loading &&
          games &&
          games.map((game) => <SingleGameClose key={game._id} game={game} />)} */}
        {loadingGames ? (
          <Spinner />
        ) : (
          games &&
          games.map((game) => <SingleGameClose key={game._id} game={game} />)
        )}
      </div>
      <Navbar />
    </>
  )
}

export default Games
