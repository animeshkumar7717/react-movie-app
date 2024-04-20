import React from 'react'
import NavBar from './components/NavBar/NavBar'
import Pages from './components/Pages/Pages'

const App = () => {
  return (
    <div>
        <NavBar />
        <div className='pages'>
          <Pages />
        </div>
    </div>
  )
}

export default App
