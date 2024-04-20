import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button';
import './Form.css';
import SearchBox from '../SearchBox';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingEmails = JSON.parse(localStorage.getItem('userEmails')) || [];
    const userExists = existingEmails.includes(email);

    if (userExists) {
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
          Welcome!
          <NavLink to={'/'} />
        </div>
      ) : (
        errorMessage && <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default SignIn;
