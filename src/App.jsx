import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar       from './components/Navbar'
import Footer       from './components/Footer'
import Home         from './pages/Home'
import Workshops    from './pages/Workshops'
import BookWorkshop from './pages/BookWorkshop'
import Login        from './pages/Login'
import Register     from './pages/Register'
import Dashboard    from './pages/Dashboard'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />}         />
          <Route path="/workshops" element={<Workshops />}    />
          <Route path="/book"      element={<BookWorkshop />} />
          <Route path="/login"     element={<Login />}        />
          <Route path="/register"  element={<Register />}     />
          <Route path="/dashboard" element={<Dashboard />}    />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
