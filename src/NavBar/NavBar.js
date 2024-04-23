import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_ACTION_TYPE } from '../store/UserReducer.js';
import { selectCurrentUser } from '../store/UserSelector.js';
import './NavBar.css';
import ToggleTheme from '../components/ToggleButton.js';

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch({
      type: USER_ACTION_TYPE.SET_CURRENT_SIGNIN_USER
    });
    localStorage.setItem('current', null)
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  };

  return (
    <div className={`navBar ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <NavLink to={'/'} style={{ textDecoration: 'none', color: '#fff'}}>
          <h1>WATCHLISTS</h1>
        </NavLink>
      <ul>
        <ToggleTheme isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
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

export default NavBar;
