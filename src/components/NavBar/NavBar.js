import React from 'react'
import './NavBar.css';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <div className='navBar'>
        <NavLink to={'/'} style={{ textDecoration: 'none', color: '#fff'}}>
          <h1>WATCHLISTS</h1>
        </NavLink>
      <ul>
        <NavLink to={'/sign-in'} style={{ textDecoration: 'none', color: '#fff'}}><li>Sign-in</li></NavLink>
        <NavLink to={'/sign-up'} style={{ textDecoration: 'none', color: '#fff'}}><li>Sign-up</li></NavLink>
        <NavLink to={'/sign-out'} style={{ textDecoration: 'none', color: '#fff'}}><li>Sign-out</li></NavLink>
      </ul>
    </div>
  )
}

export default NavBar
