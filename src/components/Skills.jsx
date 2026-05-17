import React from 'react'
import { motion } from 'framer-motion'

const SKILLS = [
  { name: 'Desarrollo de Ideas', level: 80 },
  { name: 'Servidores de Minecraft', level: 95 }
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }

export default function Skills() {
  return (
    <section className="skills">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          Habilidades
        </motion.h2>
        <motion.div 
          className="skills-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SKILLS.map(s => (
            <motion.div key={s.name} className="skill" variants={item}>
              <div className="skill-head">
                <strong>{s.name}</strong>
                <span className="muted">{s.level}%</span>
              </div>
              <div className="bar">
                <motion.div className="bar-fill" initial={{ width: 0 }} whileInView={{ width: s.level + '%' }} transition={{ duration: 0.9, delay: 0.1 }} viewport={{ once: true }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
