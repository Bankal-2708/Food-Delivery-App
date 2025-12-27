import React from 'react'
import Navbar from './Components/NavBar/Navbar'
import Header from './Components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Menu from './Components/Pages/Menu'
import Contact from './Components/Pages/Contact'
import Mobile from './Components/Pages/Mobile'

function App() {
  return (
    <div className='m-10'>
      <Navbar/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/mobile' element={<Mobile/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default App