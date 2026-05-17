import React from 'react'
import { motion } from 'framer-motion'

const ITEMS = [
  { year: '2024', title: 'SandoriaMc', desc: 'payo' },
  { year: '2025', title: 'Zroven', desc: 'Tienda activa bajo mi gestión' },
  { year: '2025', title: 'BuyLeonix', desc: 'Tienda activa bajo mi gestión' },
  { year: '2025', title: 'Accuverse', desc: 'Tienda de Cuentas' },
  { year: '2025', title: 'GaspachoWork', desc: 'Desarrollo de Software y más' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }

export default function Timeline() {
  return (
    <section className="timeline">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          Trayectoria
        </motion.h2>
        <motion.div 
          className="timeline-list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {ITEMS.map((it, i) => (
            <motion.div key={it.year + i} className="timeline-item" variants={item}>
              <div className="year">{it.year}</div>
              <div className="detail">
                <strong>{it.title}</strong>
                <p className="muted">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
