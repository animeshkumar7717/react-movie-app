import React from 'react';
import img from '../../image/start.png';

const Home = () => {
  return (
    <div className='img' style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', width: '100%', height: '100vh' }}>
    </div>
  );
};

export default Home;
