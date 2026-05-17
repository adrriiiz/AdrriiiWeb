import React, { useRef, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import Nav from './components/Nav'
import Hero from './components/Hero'
import Widgets from './components/Widgets'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Social from './components/Social'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { EntryScreen } from './components/EntryScreen'

export default function App() {
  const audioRef = useRef(null)
  const [entered, setEntered] = useState(false)

  const handleEnter = () => {
    audioRef.current?.play()
    setEntered(true)
  }

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

      <audio ref={audioRef} loop src="/music/song.mp3" />

      <AnimatePresence>
        {!entered && <EntryScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {entered && (
        <>
          <Nav />
          <main>
            <Hero audioRef={audioRef} />
            <Widgets />
            <Projects />
            <Skills />
            <Timeline />
            <Social />
            <Contact />
            <Footer />
          </main>
        </>
      )}

    </div>
  )
}
