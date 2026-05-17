import React, { useState, useEffect } from 'react'

const USER_ID = '750770728739012648'
const BIRTHDAY = new Date('2011-11-10T00:00:00')

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
      setTime(now.toLocaleTimeString('en-EN', {
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
      <p className="widget-label">Location</p>

      <div className="loc-top">
        <span className="loc-flag">🇪🇸</span>
        <div className="loc-info">
          <span className="loc-city">Unknown, Spain</span>
          <span className="loc-region">Andalusia</span>
        </div>
      </div>

      <div className="loc-time">
        <span className="loc-clock">{time}</span>
        <span className="loc-date">{date}</span>
      </div>
    </div>
  )
}

// ── Widget Edad ─────────────────────────────────────────────────
function AgeWidget() {
  const [age, setAge] = useState({})

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const diff = now - BIRTHDAY

      const years   = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
      const months  = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
      const days    = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
      const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setAge({ years, months, days, hours, minutes, seconds })
    }
    calc()
    const iv = setInterval(calc, 1000)
    return () => clearInterval(iv)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  return (
    <div className="widget widget-age">
      <p className="widget-label">MY AGE</p>

      <div className="age-main">
        <span className="age-years">{age.years}</span>
        <span className="age-years-label">year(s)</span>
      </div>

      <div className="age-grid">
        <div className="age-unit">
          <span className="age-val">{pad(age.months)}</span>
          <span className="age-key">month(s)</span>
        </div>
        <div className="age-unit">
          <span className="age-val">{pad(age.days)}</span>
          <span className="age-key">day(s)</span>
        </div>
        <div className="age-unit">
          <span className="age-val">{pad(age.hours)}</span>
          <span className="age-key">hour(s)</span>
        </div>
        <div className="age-unit">
          <span className="age-val">{pad(age.minutes)}</span>
          <span className="age-key">min(s)</span>
        </div>
        <div className="age-unit">
          <span className="age-val age-val--seconds">{pad(age.seconds)}</span>
          <span className="age-key">sec(s)</span>
        </div>
      </div>

    </div>
  )
}

// ── Contenedor ──────────────────────────────────────────────────
export default function Widgets() {
  return (
    <section className="widgets-section">
      <div className="container">
        <div className="widgets-grid">
          <DiscordWidget />
          <LocationWidget />
          <AgeWidget />
        </div>
      </div>
    </section>
  )
}
