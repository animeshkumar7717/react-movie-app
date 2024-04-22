import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from '../Pages'
import ConditionalRendering from '../Pages/ConditionalRendering'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ConditionalRendering />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  )
}

export default Router
