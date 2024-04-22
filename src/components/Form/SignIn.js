import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { USER_ACTION_TYPE } from '../../store/UserReducer.js';
import { selectCurrentUser } from '../../store/UserSelector.js';

import Button from '../Button';
import './Form.css';
import SearchBox from '../SearchBox';

const SignIn = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log('currentUser', currentUser);

  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const existingEmails = JSON.parse(localStorage.getItem('userEmails')) || [];
    const userExists = existingEmails.includes(email);
    
    if (userExists) {
      dispatch({
        type: USER_ACTION_TYPE.SET_CURRENT_SIGNIN_USER,
        payload: { email },
      });
      localStorage.setItem('current', JSON.stringify(email))
      setUserExists(true);
    } else {
      setErrorMessage('User does not exist');
    }
  };
    
  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signin-email">Email Address</label>
        <SearchBox searchValue={email} setSearchValue={setEmail} placeholder="Enter your email address" />
        <br />
        <Button name="Submit" />
      </form>
      {userExists ? (
        <div>
          <Navigate to='/' />
        </div>
      ) : (
        <div style={{color: 'red'}}>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default SignIn;
