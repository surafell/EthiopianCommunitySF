import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import AboutSection from './pages/AboutSection'
import WhatWeDo from './pages/WhatWeDo'
import Program from './pages/Program'
import Events from './pages/Events'
import EventsPeriod from './pages/EventsPeriod'
import Membership from './pages/Membership'
import Donation from './pages/Donation'
import Contact from './pages/Contact'
import Governance from './pages/Governance'
import Privacy from './pages/Privacy'
import Admin from './pages/Admin'
import VolunteerForm from './pages/VolunteerForm'
import NotFound from './pages/NotFound'
import { STORAGE_KEY, SESSION_KEY, defaultContent, loadContent } from './content'

function App() {
  const [content, setContent] = useState(loadContent)
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(SESSION_KEY) === 'true')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  function updateContent(field, value) {
    setContent((current) => ({ ...current, [field]: value }))
  }

  function resetContent() {
    setContent(defaultContent)
  }

  function handleLogin(password) {
    if (password === 'admin123') {
      localStorage.setItem(SESSION_KEY, 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY)
    setIsAdmin(false)
  }

  const siteContext = {
    content,
    setContent,
    isAdmin,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onReset: resetContent,
    onUpdate: updateContent,
  }

  return (
    <div className={`site-shell theme-${content.theme}`}>
      <Routes>
        <Route element={<Layout {...siteContext} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/:section" element={<AboutSection />} />
          <Route path="what-we-do" element={<WhatWeDo />} />
          <Route path="what-we-do/:slug" element={<Program />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:period" element={<EventsPeriod />} />
          <Route path="membership" element={<Membership />} />
          <Route path="donate" element={<Donation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="volunteer" element={<VolunteerForm />} />
          <Route path="governance" element={<Governance />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
