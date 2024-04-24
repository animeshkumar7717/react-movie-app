import React, { useState } from 'react';
import Button from '../components/Button';
import './Pages.css';
import SearchBox from '../components/SearchBox';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = (e) => {
    let existingEmails = [];
    let updatedEmails = [];

    e.preventDefault();
    
    try {
      const storedEmails = localStorage.getItem('userEmails') || [];
      if (storedEmails) {
        existingEmails = JSON.parse(storedEmails);
      }
    } catch (error) {
      console.error("Error parsing stored emails from localStorage:", error);
    }
    
    if(!existingEmails.includes(email)) {
      updatedEmails = [...existingEmails, email];
    } else {
      setError('User is already registered!')
      return;
    }

    try {
      localStorage.setItem('userEmails', JSON.stringify(updatedEmails));
    } catch (error) {
      console.error("Error storing updated emails in localStorage:", error);
    }
    
    setCurrentUser(true);
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
        {error && (<div style={{color: 'red'}}>{error}</div>)}
      </form>
      {currentUser && <Navigate to='/sign-in' />}
    </div>
  );
};

export default SignUp;
