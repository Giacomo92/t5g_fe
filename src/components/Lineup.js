import React from 'react'
import Banner from './Banner'
import My5 from './My5'
import Opponent from './Opponent'

const Lineup = ({
  team,
  opponent,
  createRandomUserTeam,
  setModal,
  bannerContent,
}) => {
  return (
    <>
      <Banner>{bannerContent}</Banner>
      <My5 team={team} createRandomUserTeam={createRandomUserTeam} />
      <Opponent team={team} opponent={opponent} setModal={setModal} />
    </>
  )
}

export default Lineup
