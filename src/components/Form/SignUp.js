import React, { useState } from 'react';
import Button from '../Button';
import './Form.css';
import SearchBox from '../SearchBox';

const SignUp = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingEmails = JSON.parse(localStorage.getItem('userEmails')) || [];
    const updatedEmails = [...existingEmails, email];
    localStorage.setItem('userEmails', JSON.stringify(updatedEmails));
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
    </div>
  );
};

export default SignUp;
