import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../store/UserSelector';

import Main from './Main';
import Home from './Home/Home.js'


const ConditionalRendering = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div>
      {currentUser ? (
        <div className='main'>
          <Main />
        </div>
        ): (
          <div className='main'>
            <Home />
          </div>
      )}
    </div>
  )
}

export default ConditionalRendering
