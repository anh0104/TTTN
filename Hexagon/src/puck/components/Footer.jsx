import React from 'react'

export default function Footer({ lang = 'vi' } = {}) {
  const text = lang === 'en'
    ? 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
    : 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
  return (
    <footer style={{ background: '#1B4332', padding: '20px 0', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{text}</p>
    </footer>
  )
}