import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { USER_ACTION_TYPE } from '../../store/UserReducer.js';
import { selectCurrentUser } from '../../store/UserSelector.js';

import Button from '../Button';
import './Form.css';
import SearchBox from '../SearchBox';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log('currentUser', currentUser);
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingEmails = JSON.parse(localStorage.getItem('userEmails')) || [];
    const updatedEmails = [...existingEmails, email];
    localStorage.setItem('userEmails', JSON.stringify(updatedEmails));

    dispatch({
      type: USER_ACTION_TYPE.SET_CURRENT_SIGNUP_USER,
      payload: { email },
    });

    setEmail('');
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signup-email">Email Address</label>
        <SearchBox searchValue={email} setSearchValue={setEmail} placeholder="Enter your email address" />
        <br />
        <Button name="Submit" />
      </form>
      {currentUser && <Navigate to='/' />}
    </div>
  );
};

export default SignUp;
