import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div>© {new Date().getFullYear()} Adrian Ortiz</div>
        <div className="muted">Hecho con ❤️ para Adri</div>
      </div>
    </footer>
  )
}
