import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  const tags = project.category ? [project.category] : []
  if (project.status === 'Cerrada') tags.push('Cerrada')

  return (
    <motion.a
      className={`project-card ${project.status === 'Cerrada' ? 'closed' : ''}`}
      href={project.url || '#'}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.03, translateY: -6 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="card-top">
        <h3>{project.name}</h3>
        <span className="role">{project.role}</span>
      </div>
      <p className="url">{project.url}</p>

      <div className="tags">
        {tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="status">{project.status}</div>
    </motion.a>
  )
}
