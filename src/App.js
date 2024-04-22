import React from 'react'
import NavBar from './NavBar/NavBar'
import Router from './Routes/Router'

const App = () => {
  return (
    <div>
        <NavBar />
        <div className='pages'>
          <Router />
        </div>
    </div>
  )
}

export default App
