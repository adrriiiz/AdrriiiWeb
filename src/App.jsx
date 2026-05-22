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

const SONGS = [
  '/music/music1.mp3',
  '/music/music2.mp3',
  '/music/music3.mp3',
  '/music/music4.mp3',
  '/music/music5.mp3',
]

const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)]

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

      <audio ref={audioRef} loop src={randomSong} />

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
