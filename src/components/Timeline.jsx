import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ITEMS = [
  { date: '29/11', title: 'GaspachoWork', desc: 'Game Studio who developed Missing Texture', tag: 'Game Studio', icon: '🎮' },
  { date: '11/10', title: 'Zr⌀ven', desc: 'My first brand of clothes that i created', tag: 'Brand', icon: '👕' },
  { date: '23/04', title: 'BuyLeonix', desc: 'It used to be a iphone/samsung store', tag: 'Store', icon: '📱' },
  { date: '05/04', title: 'Dealspov', desc: 'It used to be a shoes / clothes store', tag: 'Store', icon: '👟' },
  { date: '30/03', title: 'Accuverse', desc: 'It used to be a account store (steam, netflix, disney)', tag: 'Store', icon: '🔑' },
  { date: '21/01', title: 'DesertsCraft', desc: 'It was the first profesional server that i opened', tag: 'Server', icon: '⛏️' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariant = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Timeline() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="timeline">
      <div className="container">

        <motion.div
          className="tl-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Timeline</h2>
          <p className="tl-subtitle">Projects & ventures over the years</p>
        </motion.div>

        <motion.div
          className="tl-list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Línea vertical */}
          <div className="tl-line" />

          {ITEMS.map((it, i) => (
            <motion.div
              key={i}
              className={`tl-item ${hovered === i ? 'tl-item--active' : ''}`}
              variants={itemVariant}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Nodo en la línea */}
              <div className="tl-node">
                <div className="tl-node-inner" />
              </div>

              {/* Fecha */}
              <div className="tl-date">{it.date}</div>

              {/* Contenido */}
              <div className="tl-content">
                <div className="tl-content-top">
                  <span className="tl-icon">{it.icon}</span>
                  <div className="tl-titles">
                    <strong className="tl-title">{it.title}</strong>
                    <span className="tl-tag">{it.tag}</span>
                  </div>
                </div>
                <p className="tl-desc">{it.desc}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
