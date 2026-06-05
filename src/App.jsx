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
  '/music/music6.mp3',
  '/music/music7.mp3',
  '/music/music8.mp3',
  '/music/music9.mp3',
]

const BACKGROUNDS = [
  { type: 'video',    src:   '/bg.mp4' },
  { type: 'video',    src:   '/bg2.mp4' },
  { type: 'video',    src:   '/bg3.mp4' },
  { type: 'video',    src:   '/bg4.mp4' },
  { type: 'gradient', value: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { type: 'gradient', value: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' },
]

const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)]
const randomBg   = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)]

export default function App() {
  const audioRef = useRef(null)
  const [entered, setEntered] = useState(false)

  const handleEnter = () => {
    audioRef.current?.play()
    setEntered(true)
  }

  useEffect(() => {
    const sequence = ['A','Ad','Adr','Adri','Adria','Adrian','Adria','Adri','Adr','Ad','A']
    let index = 0
    const interval = setInterval(() => {
      document.title = sequence[index] + ' • Portfolio'
      index = (index + 1) % sequence.length
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app-root">

      {/* ── Fondo dinámico ── */}
      {randomBg.type === 'video' && (
        <video autoPlay loop muted playsInline
          style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%',
                   objectFit:'cover', zIndex:-1, opacity:0.3 }}>
          <source src={randomBg.src} type="video/mp4" />
        </video>
      )}
      {randomBg.type === 'image' && (
        <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%',
                      backgroundImage:`url(${randomBg.src})`, backgroundSize:'cover',
                      backgroundPosition:'center', zIndex:-1, opacity:0.3 }} />
      )}
      {randomBg.type === 'gradient' && (
        <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%',
                      background:randomBg.value, zIndex:-1 }} />
      )}

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
