import React from 'react'
import { motion } from 'framer-motion'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function Hero() {
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
                alt="Adri Ortiz" 
                className="avatar-img"
              />
            </motion.div>
            <div className="hero-text">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.h1 className="gradient-text" variants={item}>Adrian Ortiz</motion.h1>
              </motion.div>
              <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
                Proyectos Variados · <strong>Abierto a nuevos proyectos</strong>
              </motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
                <a className="btn primary" href="#projects">Ver proyectos</a>
                <a className="btn ghost" href="#contact">Contactar</a>
              </motion.div>
            </div>
          </div>

          <motion.div className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
            <p className="muted">Desarrollo de Ideas • Servidores de Minecraft</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
