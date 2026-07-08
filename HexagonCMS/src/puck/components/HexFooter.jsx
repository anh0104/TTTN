import React from 'react'
import { buildBackground } from '../fields.js'

export function HexFooter({ lang = 'vi' } = {}) {
  const text = lang === 'en' ? 'Copyright 2026 © Hexagon Corporation. All rights reserved.' : 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
  return (
    <footer style={{ background: '#1B4332', padding: '18px 0', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>{text}</p>
    </footer>
  )
}