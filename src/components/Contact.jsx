import React from 'react'
import { motion } from 'framer-motion'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          Contacto
        </motion.h2>
        
        <motion.div 
          className="contact-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="contact-card" variants={item}>
            <h3>¿Tienes un proyecto?</h3>
            <p className="muted">Envíame un correo o usa el formulario para que podamos hablar sobre tu idea.</p>
            <a className="btn primary" href="mailto:talcopalanariz@gmail.com">Enviar email</a>
          </motion.div>

          <motion.form className="contact-form" variants={item} onSubmit={e => e.preventDefault()}>
            <input placeholder="Tu nombre" />
            <input placeholder="Tu email" type="email" />
            <textarea placeholder="Describe tu proyecto" rows={4} />
            <button className="btn primary" type="submit">Enviar</button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
