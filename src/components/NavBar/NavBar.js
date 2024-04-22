import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { USER_ACTION_TYPE } from '../../store/UserReducer.js';
import { selectCurrentUser } from '../../store/UserSelector.js';

import './NavBar.css';


const NavBar = () => {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch({
      type: USER_ACTION_TYPE.SET_CURRENT_SIGNOUT_USER
    })
  };

  return (
    <div className='navBar'>
        <NavLink to={'/'} style={{ textDecoration: 'none', color: '#fff'}}>
          <h1>WATCHLISTS</h1>
        </NavLink>
      <ul>
        {currentUser ? (
          <NavLink to={'/'} style={{ textDecoration: 'none', color: '#fff'}}>
            <li onClick={handleSignOut}>Sign-out</li>
          </NavLink>
        ) : (
          <>
            <NavLink to={'/sign-in'} style={{ textDecoration: 'none', color: '#fff'}}><li>Sign-in</li></NavLink>
            <NavLink to={'/sign-up'} style={{ textDecoration: 'none', color: '#fff'}}><li>Sign-up</li></NavLink>
          </>
        )}
      </ul>
    </div>
  )
}

export default NavBar
