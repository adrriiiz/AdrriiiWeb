import React, { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

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

function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 })

  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setVisible(true)
    const leave = () => setVisible(false)
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const onPointerOver = (e) => {
      if (
        e.target.closest(
          'a, button, input, textarea, select, label, [role="button"], .project-card, .social-card, .btn, .categories button'
        )
      ) {
        setHovering(true)
      }
    }

    const onPointerOut = (e) => {
      if (
        e.relatedTarget &&
        e.relatedTarget.closest &&
        e.relatedTarget.closest(
          'a, button, input, textarea, select, label, [role="button"], .project-card, .social-card, .btn, .categories button'
        )
      ) {
        return
      }
      setHovering(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseenter', enter)
    window.addEventListener('mouseleave', leave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseenter', enter)
      window.removeEventListener('mouseleave', leave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
    }
  }, [x, y, visible])

  return (
    <motion.div
      className={`custom-cursor ${hovering ? 'is-hover' : ''} ${clicking ? 'is-click' : ''}`}
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}

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

      <CustomCursor />

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
