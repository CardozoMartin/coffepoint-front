import React from 'react'
import LoginPage from './components/Pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './components/Pages/RegisterPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes