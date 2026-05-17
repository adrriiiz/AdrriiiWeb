import React, { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Social from './components/Social'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const sequence = ['A', 'Ad', 'Adr', 'Adri', 'Adria', 'Adrian', 'Adria', 'Adri', 'Adr', 'Ad', 'A']
    let index = 0
    
    const interval = setInterval(() => {
      document.title = sequence[index] + ' • Portfolio'
      index = (index + 1) % sequence.length
    }, 150)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app-root">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
        <Social />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
