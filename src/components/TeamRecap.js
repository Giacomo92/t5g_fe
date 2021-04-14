import { useSelector } from 'react-redux'
import './TeamRecap.css'

const TeamRecap = () => {
  const teams = useSelector((state) => state.teams)
  const { userTeam, teamCost } = teams

  return (
    <div className='TeamRecap'>
      <div className='AthleteToPick'>
        <p>Atleti da scegliere:</p>
        <p>{5 - userTeam.length}/5</p>
      </div>
      <div className='Budget'>
        <p>Budget rimasto:</p>
        <p>{25 - teamCost}/25 cr</p>
      </div>
    </div>
  )
}

export default TeamRecap
