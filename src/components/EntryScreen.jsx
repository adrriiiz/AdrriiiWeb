import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── ENTRY SCREEN ───────────────────────────────────────────────
// Añade este componente en tu app y envuelve tu <Hero /> con él.
// En cuanto el usuario hace click, se inicia el audio y desaparece
// la pantalla de entrada — igual que guns.lol.

const SONG_URL = "/music/song.mp3"

export function EntryScreen({ onEnter }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="entry-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Fondo animado */}
      <div className="entry-bg">
        <div className="entry-orb orb1" />
        <div className="entry-orb orb2" />
        <div className="entry-grain" />
      </div>

      <motion.div
        className="entry-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.p
          className="entry-hint"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          🎵 music on
        </motion.p>

        <motion.button
          className={`entry-btn ${hovered ? 'entry-btn--hovered' : ''}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onEnter}
          whileTap={{ scale: 0.95 }}
        >
          <span className="entry-btn-text">enter</span>
          <span className="entry-btn-arrow">→</span>
        </motion.button>

        <p className="entry-sub">adrriii.dev</p>
      </motion.div>

      <style>{`
        .entry-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0e17;
          cursor: pointer;
        }

        /* ── Fondo con orbes ── */
        .entry-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .entry-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          animation: float 8s ease-in-out infinite alternate;
        }
        .orb1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #00ffb2 0%, transparent 70%);
          top: -150px; left: -100px;
          animation-duration: 9s;
        }
        .orb2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #0066ff 0%, transparent 70%);
          bottom: -120px; right: -80px;
          animation-duration: 11s;
          animation-delay: -4s;
        }
        @keyframes float {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* Grano sutil */
        .entry-grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px;
        }

        /* ── Contenido ── */
        .entry-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          user-select: none;
        }

        .entry-hint {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          color: #00ffb2;
          letter-spacing: 0.15em;
          text-transform: lowercase;
          margin: 0;
        }

        /* ── Botón ── */
        .entry-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 52px;
          background: transparent;
          border: 1.5px solid rgba(0, 255, 178, 0.35);
          border-radius: 4px;
          color: #e8f0fe;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 15px;
          letter-spacing: 0.25em;
          text-transform: lowercase;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s, color 0.3s;
          overflow: hidden;
        }
        .entry-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,255,178,0.08), rgba(0,102,255,0.08));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .entry-btn--hovered {
          border-color: rgba(0, 255, 178, 0.8);
          color: #00ffb2;
        }
        .entry-btn--hovered::before {
          opacity: 1;
        }
        .entry-btn-arrow {
          transition: transform 0.3s;
        }
        .entry-btn--hovered .entry-btn-arrow {
          transform: translateX(5px);
        }

        .entry-sub {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.2em;
          margin: 0;
        }
      `}</style>
    </motion.div>
  )
}

// ─── HERO MODIFICADO ────────────────────────────────────────────
// Tu Hero.jsx actualizado — el audio ya NO intenta hacer autoplay
// solo. Se activa desde fuera cuando el usuario hace click en Enter.

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function Hero({ audioRef }) {
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
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
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              <img
                src="https://cdn.discordapp.com/avatars/750770728739012648/a_68be02b496127c2f75159f79443fb6e2.gif?size=512"
                alt="Adrriii"
                className="avatar-img"
              />
            </motion.div>

            <div className="hero-text">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.h1 className="gradient-text" variants={itemVariant}>
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

              <motion.div
                className="music-player"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <button onClick={toggleMusic} className="music-btn">
                  {playing ? '⏸' : '▶'}
                </button>
                <input
                  type="range" min="0" max="1" step="0.01" value={volume}
                  onChange={(e) => {
                    setVolume(e.target.value)
                    if (audioRef.current) audioRef.current.volume = e.target.value
                  }}
                />
                <span className="song-title">your song</span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p className="muted">TV Series • Spanish Developer • Making money</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── APP / LAYOUT ───────────────────────────────────────────────
// En tu App.jsx (o layout principal) úsalo así:
//
//   import { EntryScreen } from './EntryScreen'
//   import { Hero }        from './EntryScreen'   // o tu Hero.jsx
//
//   export default function App() {
//     const audioRef   = useRef(null)
//     const [entered, setEntered] = useState(false)
//
//     const handleEnter = () => {
//       if (audioRef.current) {
//         audioRef.current.volume = 0.5
//         audioRef.current.play()
//       }
//       setEntered(true)
//     }
//
//     return (
//       <>
//         <audio ref={audioRef} loop src="/music/song.mp3" />
//
//         <AnimatePresence>
//           {!entered && <EntryScreen onEnter={handleEnter} />}
//         </AnimatePresence>
//
//         {entered && <Hero audioRef={audioRef} />}
//         {/* resto de tu web */}
//       </>
//     )
//   }
