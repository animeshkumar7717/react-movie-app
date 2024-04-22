import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from '../Form'
import ConditionalRendering from '../ConditionalRendering'

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<ConditionalRendering />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  )
}

export default Pages
