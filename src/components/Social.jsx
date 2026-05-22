import React from 'react'
import { motion } from 'framer-motion'

const SOCIALS = [
  { name: 'Ko-Fi', url: 'https://ko-fi.com/gaspachowork', Icon: SiKofi },
  { name: 'Twitch', url: 'https://www.twitch.tv/lolproyamito24', Icon: SiTwitch },
  { name: 'Roblox', url: 'https://www.roblox.com/es/users/1502681837/profile', Icon: SiRoblox },
  { name: 'PayPal', url: 'https://www.paypal.com/paypalme/adridesertscraft', Icon: SiPaypal },
  { name: 'TikTok', url: 'https://www.tiktok.com/@adrian1110._', Icon: SiTiktok },
  { name: 'Instagram', url: 'https://www.instagram.com/adrian.ortzz', Icon: SiInstagram },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVar = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
}

export default function Social() {
  return (
    <section className="social-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Socials
        </motion.h2>

        <motion.div
          className="social-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SOCIALS.map(({ name, url, Icon }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="social-card"
              variants={itemVar}
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="social-icon">
                <Icon />
              </div>
              <div className="social-name">{name}</div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
