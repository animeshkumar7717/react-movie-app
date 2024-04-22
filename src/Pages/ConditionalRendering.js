import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../store/UserSelector.js';

import Main from './Main.js';
import Home from './Home.js'


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
