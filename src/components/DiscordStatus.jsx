import React, { useState, useEffect } from 'react'

const USER_ID = '750770728739012648'

const STATUS_COLOR = {
  online: '#23d18b',
  idle:   '#f5a623',
  dnd:    '#f04747',
  offline:'#747f8d',
}

const STATUS_LABEL = {
  online: 'Online',
  idle:   'Idle',
  dnd:    'No molestar',
  offline:'Offline',
}

export default function DiscordStatus() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchStatus = () => {
      fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
        .then(r => r.json())
        .then(d => setData(d.data))
        .catch(() => {})
    }

    fetchStatus()
    // Refresca cada 30 segundos
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return null

  const status   = data.discord_status
  const spotify  = data.spotify
  const activity = data.activities?.find(a => a.type === 0) // jugando a algo

  return (
    <div className="discord-status">

      {/* Indicador de estado */}
      <div className="ds-row">
        <span
          className="ds-dot"
          style={{ background: STATUS_COLOR[status] }}
        />
        <span className="ds-label">
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* Spotify */}
      {spotify && (
        <div className="ds-activity ds-spotify">
          <span className="ds-icon">🎵</span>
          <div className="ds-info">
            <span className="ds-title">{spotify.song}</span>
            <span className="ds-sub">by {spotify.artist}</span>
          </div>
        </div>
      )}

      {/* Jugando a algo */}
      {!spotify && activity && (
        <div className="ds-activity">
          <span className="ds-icon">🎮</span>
          <div className="ds-info">
            <span className="ds-title">{activity.name}</span>
            {activity.details && (
              <span className="ds-sub">{activity.details}</span>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
