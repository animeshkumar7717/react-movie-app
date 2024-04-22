import React, { useState } from 'react';
import Button from '../Button';
import './Form.css';
import SearchBox from '../SearchBox';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let existingEmails = [];
    try {
      const storedEmails = localStorage.getItem('userEmails') || [];
      if (storedEmails) {
        existingEmails = JSON.parse(storedEmails);
      }
    } catch (error) {
      console.error("Error parsing stored emails from localStorage:", error);
    }
    
    const updatedEmails = [...existingEmails, email];

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
      </form>
      {currentUser && <Navigate to='/sign-in' />}
    </div>
  );
};

export default SignUp;
