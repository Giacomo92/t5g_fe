import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Home } from '../svg/home.svg'
import { ReactComponent as Games } from '../svg/stadium.svg'
import { ReactComponent as Standings } from '../svg/prize.svg'
import { ReactComponent as Profile } from '../svg/user.svg'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <NavLink to='/' exact activeClassName={'active'}>
        <div className='NavLink'>
          <Home className='NavIcon' />
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink to='/games' exact activeClassName={'active'}>
        <div className='NavLink'>
          <Games className='NavIcon' />
          <p>Partite</p>
        </div>
      </NavLink>
      <NavLink to='/standings' exact activeClassName={'active'}>
        <div className='NavLink'>
          <Standings className='NavIcon' />
          <p>Classifica</p>
        </div>
      </NavLink>
      <NavLink to='/profile' exact activeClassName={'active'}>
        <div className='NavLink'>
          <Profile className='NavIcon' />
          <p>Profilo</p>
        </div>
      </NavLink>
    </div>
  )
}

export default Navbar
