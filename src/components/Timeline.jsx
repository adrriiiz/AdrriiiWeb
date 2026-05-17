import React from 'react'
import { motion } from 'framer-motion'

const ITEMS = [
  { year: '21/01', title: 'DesertsCraft', desc: 'It was the first profesional server that i opened | Closed' },
  { year: '11/10', title: 'Zr⌀ven', desc: 'My first brand of clothes that i created | Still working' },
  { year: '23/04', title: 'BuyLeonix', desc: 'It used to be a iphone/samsung store | Closed' },
  { year: '02/04', title: 'Accuverse', desc: 'It used to be a account store (steam, netflix, disney) | Closed' },
  { year: '29/11', title: 'GaspachoWork', desc: 'Game Studio who developed Missing Texture | Opened' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }

export default function Timeline() {
  return (
    <section className="timeline">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          TimeLine
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
