import './My5.css'
import Button from './../UI/Button'
import AthleteOnField from './AthleteOnField'
import AthleteOnFieldEmpty from './AthleteOnFieldEmpty'

const My5 = ({ team, createRandomUserTeam }) => {
  return (
    <div className='My5'>
      <div className='My5Header'>
        <h1>LA MIA FORMAZIONE</h1>
        <Button clicked={createRandomUserTeam} className='RandomTeamBtn'>
          SQUADRA CASUALE
        </Button>
      </div>
      <div className='My5Team'>
        <div className='FirstRow'>
          {!team[0] ? (
            <AthleteOnFieldEmpty />
          ) : (
            <AthleteOnField athlete={team[0]} />
          )}
        </div>
        <div className='SecondRow'>
          {!team[1] ? (
            <AthleteOnFieldEmpty />
          ) : (
            <AthleteOnField athlete={team[1]} />
          )}
          {!team[2] ? (
            <AthleteOnFieldEmpty />
          ) : (
            <AthleteOnField athlete={team[2]} />
          )}
        </div>
        <div className='ThirdRow'>
          {!team[3] ? (
            <AthleteOnFieldEmpty />
          ) : (
            <AthleteOnField athlete={team[3]} />
          )}
          {!team[4] ? (
            <AthleteOnFieldEmpty />
          ) : (
            <AthleteOnField athlete={team[4]} />
          )}
        </div>
      </div>
    </div>
  )
}

export default My5
