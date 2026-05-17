import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const PROJECTS = [
  { name: 'BuyLeonix', url: 'https://buyleonix.shop', status: 'Closed', role: 'Founder', category: 'Own' },
  { name: 'Zroven', url: 'https://zroven.shop', status: 'Still Working', role: 'Owner', category: 'Own' },
  { name: 'Accuverse', url: 'https://accuverse.shop', status: 'Closed', role: 'Dueño', category: 'Collab' },
  { name: 'Sandoria', url: 'https://web.sandoriamc.xyz', status: 'Still Working', role: 'Co-Owner', category: 'Collab' },
  { name: 'Dealspov', url: 'https://dealspov.shop', status: 'Closed', role: 'Owner', category: 'Own' },
  { name: 'GaspachoWork', url: 'https://www.gaspachowork.xyz', status: 'Still Working', role: 'Co-Owner', category: 'Collab' }
]

const CATEGORIES = ['All', 'Own', 'Collab', 'Closed']
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Projects() {
  const [cat, setCat] = useState('Todos')

  const filtered = PROJECTS.filter(p => {
    if (cat === 'Todos') return true
    if (cat === 'Cerradas') return p.status === 'Closed'
    return p.category === cat
  })

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          Proyectos
        </motion.h2>
        
        <motion.div 
          className="categories"
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={c === cat ? 'active' : ''}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </motion.div>

        <motion.div 
          key={cat}
          className="grid"
          variants={container}
          initial="hidden"
          animate="show"
          viewport={{ once: false, margin: "-100px" }}
        >
          {filtered.map((p, i) => (
            <motion.div key={p.name} variants={item}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
