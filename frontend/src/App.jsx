import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}
function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/logout" element={
            <Logout />
          } />
          <Route path="/register" element={
            <RegisterAndLogout />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
