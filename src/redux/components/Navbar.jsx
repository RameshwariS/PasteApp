import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import logo from './browser.png'
const Navbar = () => {
  
  return (
    <div className='nav'>
      <div className='logo'>
      <img src={logo} alt="" />
      <div>Paste</div>

      </div>
      <div className='links'>

      <NavLink to="/"
        className="nav-link"
        activeClassName="active-link"
>
        Home
      </NavLink>
      <NavLink to="/pastes"
        className="nav-link"
        activeClassName="active-link"
>
        My Pastes
      </NavLink>
  </div>
    </div>
  )
}

export default Navbar