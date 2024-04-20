import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../Main'
import { SignIn, SignOut, SignUp } from '../Form'

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-out' element={<SignOut />} />
    </Routes>
  )
}

export default Pages
