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
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return null

  const status  = data.discord_status
  const user    = data.discord_user
  const spotify = data.spotify
  const activity = data.activities?.find(a => a.type === 0)

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`

  return (
    <div className="dc-card">

      {/* Avatar + nombre + estado */}
      <div className="dc-profile">
        <div className="dc-avatar-wrap">
          <img src={avatarUrl} alt={user.display_name} className="dc-avatar" />
          <span
            className="dc-status-dot"
            style={{ background: STATUS_COLOR[status] }}
            title={STATUS_LABEL[status]}
          />
        </div>

        <div className="dc-info">
          <span className="dc-name">{user.display_name || user.username}</span>
          <span className="dc-status-label" style={{ color: STATUS_COLOR[status] }}>
            {STATUS_LABEL[status]}
          </span>
        </div>
      </div>

      {/* Spotify */}
      {spotify && (
        <div className="dc-activity">
          <div className="dc-activity-icon">🎵</div>
          <div className="dc-activity-info">
            <span className="dc-activity-title">{spotify.song}</span>
            <span className="dc-activity-sub">by {spotify.artist}</span>
            {spotify.album && (
              <span className="dc-activity-sub">{spotify.album}</span>
            )}
          </div>
          {spotify.album_art_url && (
            <img src={spotify.album_art_url} alt="album" className="dc-album-art" />
          )}
        </div>
      )}

      {/* Jugando */}
      {!spotify && activity && (
        <div className="dc-activity">
          <div className="dc-activity-icon">🎮</div>
          <div className="dc-activity-info">
            <span className="dc-activity-title">{activity.name}</span>
            {activity.details && (
              <span className="dc-activity-sub">{activity.details}</span>
            )}
            {activity.state && (
              <span className="dc-activity-sub">{activity.state}</span>
            )}
          </div>
          {activity.assets?.large_image && (
            <img
              src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`}
              alt={activity.name}
              className="dc-album-art"
            />
          )}
        </div>
      )}

    </div>
  )
}
