import React from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  return (
    <motion.header 
      className="site-nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div className="brand" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          Adrriii
        </motion.div>
        <nav>
          {['Home', 'Projects', 'Contact'].map(label => (
            <motion.a 
              key={label}
              href={`#${label === 'Home' ? 'about' : label === 'Projects' ? 'projects' : 'contact'}`}
              whileHover={{ color: 'var(--accent)' }}
            >
              {label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
