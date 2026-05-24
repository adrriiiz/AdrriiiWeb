import React from 'react'
import { motion } from 'framer-motion'
import { HiLockClosed, HiBolt } from 'react-icons/hi2'
import { HiExternalLink } from 'react-icons/hi'

const STATUS_CONFIG = {
  'Closed':        { color: '#f87171', bg: 'rgba(248,113,113,0.12)', icon: <HiLockClosed size={11} /> },
  'Still Working': { color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  icon: <HiBolt size={11} /> },
  'Cerrada':       { color: '#f87171', bg: 'rgba(248,113,113,0.12)', icon: <HiLockClosed size={11} /> },
}

const ROLE_COLOR = {
  'Founder':  { color: '#fbbf24', bg: 'rgba(251,191,36,0.10)' },
  'Owner':    { color: '#6ee7b7', bg: 'rgba(110,231,183,0.10)' },
  'Dueño':    { color: '#6ee7b7', bg: 'rgba(110,231,183,0.10)' },
  'Co-Owner': { color: '#93c5fd', bg: 'rgba(147,197,253,0.10)' },
}

export default function ProjectCard({ project }) {
  const status    = STATUS_CONFIG[project.status] || STATUS_CONFIG['Still Working']
  const roleStyle = ROLE_COLOR[project.role] || { color: '#6ee7b7', bg: 'rgba(110,231,183,0.10)' }
  const isClosed  = project.status === 'Closed' || project.status === 'Cerrada'
  const domain    = project.url ? project.url.replace(/^https?:\/\//, '') : ''

  return (
    <motion.a
      className={`pc ${isClosed ? 'pc--closed' : ''}`}
      href={project.url || '#'}
      target="_blank"
      rel="noreferrer"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pc-shine" />

      {/* Header */}
      <div className="pc-head">
        <h3 className="pc-name">{project.name}</h3>
        <span className="pc-role" style={{ color: roleStyle.color, background: roleStyle.bg }}>
          {project.role}
        </span>
      </div>

      {/* URL */}
      <div className="pc-url">
        <HiExternalLink size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
        <span>{domain}</span>
      </div>

      {/* Footer */}
      <div className="pc-footer">
        <span className="pc-tag">{project.category}</span>
        <span className="pc-status" style={{ color: status.color, background: status.bg }}>
          {status.icon}
          {project.status}
        </span>
      </div>

    </motion.a>
  )
}
