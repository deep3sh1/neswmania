import { Routes, Route } from 'react-router-dom'

import Homepage from './landing_page/home/Homepage'
import Categories from './landing_page/categroies/Categoriepage'

import Navbar from './landing_page/Navbar'
import Footer from './landing_page/Footer'

import Signup from './landing_page/authentication/Signup'
import Login from './landing_page/authentication/Login'

import Notfound from './landing_page/Notfound'
import Notes from './landing_page/Notes'


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="*" element={<Notfound />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App