import React from 'react'
import { motion } from 'framer-motion'

const STATUS_CONFIG = {
  'Closed':        { color: '#f04747', bg: 'rgba(240,71,71,0.1)',   icon: '🔒' },
  'Still Working': { color: '#23d18b', bg: 'rgba(35,209,139,0.1)',  icon: '⚡' },
  'Cerrada':       { color: '#f04747', bg: 'rgba(240,71,71,0.1)',   icon: '🔒' },
}

const ROLE_COLOR = {
  'Founder':  { color: '#f5a623', bg: 'rgba(245,166,35,0.12)' },
  'Owner':    { color: '#6ee7b7', bg: 'rgba(110,231,183,0.12)' },
  'Dueño':    { color: '#6ee7b7', bg: 'rgba(110,231,183,0.12)' },
  'Co-Owner': { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
}

export default function ProjectCard({ project }) {
  const status   = STATUS_CONFIG[project.status] || STATUS_CONFIG['Still Working']
  const roleStyle = ROLE_COLOR[project.role] || { color: '#6ee7b7', bg: 'rgba(110,231,183,0.12)' }
  const isClosed = project.status === 'Closed' || project.status === 'Cerrada'

  // Extraer dominio limpio
  const domain = project.url ? project.url.replace(/^https?:\/\//, '') : ''

  return (
    <motion.a
      className={`pc ${isClosed ? 'pc--closed' : ''}`}
      href={project.url || '#'}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Brillo en hover */}
      <div className="pc-shine" />

      {/* Header */}
      <div className="pc-head">
        <div className="pc-name-wrap">
          <span
            className="pc-status-dot"
            style={{ background: status.color, boxShadow: `0 0 6px ${status.color}` }}
          />
          <h3 className="pc-name">{project.name}</h3>
        </div>
        <span
          className="pc-role"
          style={{ color: roleStyle.color, background: roleStyle.bg }}
        >
          {project.role}
        </span>
      </div>

      {/* URL */}
      <p className="pc-url">🔗 {domain}</p>

      {/* Footer */}
      <div className="pc-footer">
        <span className="pc-tag">{project.category}</span>
        <span
          className="pc-status"
          style={{ color: status.color, background: status.bg }}
        >
          {status.icon} {project.status}
        </span>
      </div>

    </motion.a>
  )
}
