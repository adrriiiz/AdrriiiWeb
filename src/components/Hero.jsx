import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { HiSpeakerWave } from 'react-icons/hi2'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const item = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function Hero({ audioRef }) {

  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showVolume, setShowVolume] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setProgress(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoaded)

    if (audio.duration) setDuration(audio.duration)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [audioRef])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value)
    setProgress(val)
    if (audioRef.current) audioRef.current.currentTime = val
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current) audioRef.current.volume = val
  }

  const volumeIcon = volume === 0
    ? <HiVolumeOff size={18} />
    : volume < 0.5
    ? <HiVolumeUp size={18} />
    : <HiSpeakerWave size={18} />

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <section id="about" className="hero">
      <div className="container">
        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="hero-top">

            <motion.div
              className="avatar"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <img
                src="https://cdn.discordapp.com/avatars/750770728739012648/a_68be02b496127c2f75159f79443fb6e2.gif?size=512"
                alt="Adrriii"
                className="avatar-img"
              />
            </motion.div>

            <div className="hero-text">

              <motion.div variants={container} initial="hidden" animate="show">
                <motion.h1 className="gradient-text" variants={item}>
                  Adrriii
                </motion.h1>
              </motion.div>

              <motion.p
                className="lead"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                1f n3w pr0jects · <strong>14yo</strong>
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <a className="btn primary" href="#projects">Look projects</a>
                <a className="btn ghost" href="#contact">Contact me</a>
              </motion.div>

              {/* MINI MUSIC PLAYER */}
              <motion.div
                className="music-player"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <button onClick={toggleMusic} className="music-btn">
                  {playing ? <BsPauseFill size={18} /> : <BsFillPlayFill size={18} />}
                </button>

                <span className="song-time">{fmt(progress)}</span>

                <input
                  className="seek-bar"
                  type="range"
                  min="0"
                  max={duration || 1}
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                />

                <span className="song-time">{fmt(duration)}</span>

                <div className="volume-wrap">
                  <button
                    className="music-btn"
                    onClick={() => setShowVolume(v => !v)}
                    title="Volumen"
                  >
                    {volumeIcon}
                  </button>

                  {showVolume && (
                    <div className="volume-popup">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolume}
                        className="volume-slider"
                        style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                      />
                    </div>
                  )}
                </div>

              </motion.div>

            </div>
          </div>

          <motion.div
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p className="muted">
              TV Series • Spanish Developer • Growing myself
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
