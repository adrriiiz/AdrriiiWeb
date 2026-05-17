import React, { useState, useEffect } from 'react'

const USER_ID = '750770728739012648'

const STATUS_COLOR = {
  online:  '#23d18b',
  idle:    '#f5a623',
  dnd:     '#f04747',
  offline: '#747f8d',
}
const STATUS_LABEL = {
  online:  'Online',
  idle:    'Idle',
  dnd:     'No molestar',
  offline: 'Offline',
}

// ── Widget Discord ──────────────────────────────────────────────
function DiscordWidget() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetch_ = () => {
      fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
        .then(r => r.json())
        .then(d => setData(d.data))
        .catch(() => {})
    }
    fetch_()
    const iv = setInterval(fetch_, 30000)
    return () => clearInterval(iv)
  }, [])

  if (!data) return <div className="widget widget-discord skeleton" />

  const status   = data.discord_status
  const user     = data.discord_user
  const spotify  = data.spotify
  const activity = data.activities?.find(a => a.type === 0)

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`

  return (
    <div className="widget widget-discord">
      <p className="widget-label">Discord</p>

      <div className="dc-profile">
        <div className="dc-avatar-wrap">
          <img src={avatarUrl} alt={user.display_name} className="dc-avatar" />
          <span className="dc-status-dot" style={{ background: STATUS_COLOR[status] }} />
        </div>
        <div className="dc-info">
          <span className="dc-name">{user.display_name || user.username}</span>
          <span className="dc-status-label" style={{ color: STATUS_COLOR[status] }}>
            {STATUS_LABEL[status]}
          </span>
        </div>
      </div>

      {spotify && (
        <div className="dc-activity">
          {spotify.album_art_url && (
            <img src={spotify.album_art_url} alt="album" className="dc-album-art" />
          )}
          <div className="dc-activity-info">
            <span className="dc-activity-title">{spotify.song}</span>
            <span className="dc-activity-sub">by {spotify.artist}</span>
          </div>
          <span className="dc-activity-icon">🎵</span>
        </div>
      )}

      {!spotify && activity && (
        <div className="dc-activity">
          <div className="dc-activity-info">
            <span className="dc-activity-title">{activity.name}</span>
            {activity.details && <span className="dc-activity-sub">{activity.details}</span>}
          </div>
          <span className="dc-activity-icon">🎮</span>
        </div>
      )}
    </div>
  )
}

// ── Widget Ubicación + Hora ─────────────────────────────────────
function LocationWidget() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('es-ES', {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }))
      setDate(now.toLocaleDateString('es-ES', {
        timeZone: 'Europe/Madrid',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }))
    }
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="widget widget-location">
      <p className="widget-label">Ubicación</p>

      <div className="loc-top">
        <span className="loc-flag">🇪🇸</span>
        <div className="loc-info">
          <span className="loc-city">Granada, España</span>
          <span className="loc-region">Andalucía</span>
        </div>
      </div>

      <div className="loc-time">
        <span className="loc-clock">{time}</span>
        <span className="loc-date">{date}</span>
      </div>
    </div>
  )
}

// ── Widget Currently Working On ─────────────────────────────────
function WorkingOnWidget() {
  // Edita esto con tu proyecto actual
  const project = {
    name: 'Mi Portfolio',
    desc: 'Diseñando y desarrollando mi web personal',
    stack: ['React', 'CSS', 'Vite'],
    status: 'En progreso',
  }

  return (
    <div className="widget widget-working">
      <p className="widget-label">Currently working on</p>

      <div className="wo-project">
        <div className="wo-dot" />
        <span className="wo-name">{project.name}</span>
      </div>

      <p className="wo-desc">{project.desc}</p>

      <div className="wo-stack">
        {project.stack.map(s => (
          <span key={s} className="wo-tag">{s}</span>
        ))}
      </div>

      <span className="wo-status">⚡ {project.status}</span>
    </div>
  )
}

// ── Contenedor de los 3 widgets ─────────────────────────────────
export default function Widgets() {
  return (
    <section className="widgets-section">
      <div className="container">
        <div className="widgets-grid">
          <DiscordWidget />
          <LocationWidget />
          <WorkingOnWidget />
        </div>
      </div>
    </section>
  )
}
