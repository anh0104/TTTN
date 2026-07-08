import React from 'react'
export default function Footer({ description='METIK – một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây.', phone='(+84) 79 721 3333', email='sale@ochao.vn', address='Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM.', contactTitle='THÔNG TIN LIÊN HỆ' }={}) {
  return (
    <footer>
      <div style={{ background:'#F5C518', padding:'56px 0 40px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64 }}>
          <div>
            <div style={{ marginBottom:20 }}>
              <svg width="140" height="64" viewBox="0 0 140 64">
                <text x="6" y="50" fontFamily="Arial Black,Arial" fontWeight="900" fontSize="44" fill="#F5A800" stroke="#E07800" strokeWidth="3" strokeLinejoin="round">metik</text>
                <text x="6" y="50" fontFamily="Arial Black,Arial" fontWeight="900" fontSize="44" fill="#FFD000">metik</text>
                <ellipse cx="76" cy="14" rx="6" ry="9" fill="#4CAF50" transform="rotate(-30 76 14)"/>
                <circle cx="10" cy="10" r="5" fill="#FFD000" opacity="0.7"/>
              </svg>
            </div>
            <p style={{ color:'#333', fontSize:15, lineHeight:1.8, maxWidth:420 }}>{description||''}</p>
          </div>
          <div>
            <h3 style={{ color:'#2E7D32', fontSize:18, fontWeight:800, textTransform:'uppercase', marginBottom:20 }}>{contactTitle||'THÔNG TIN LIÊN HỆ'}</h3>
            <div style={{ width:'100%', height:1, background:'#E0B000', marginBottom:28 }}/>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {phone&&<div style={{ display:'flex',gap:14,alignItems:'center',color:'#222',fontSize:15 }}><span style={{fontSize:20}}>📞</span>{phone}</div>}
              {email&&<div style={{ display:'flex',gap:14,alignItems:'center',color:'#222',fontSize:15 }}><span style={{fontSize:20}}>✉</span>{email}</div>}
              {address&&<div style={{ display:'flex',gap:14,alignItems:'flex-start',color:'#222',fontSize:15 }}><span style={{fontSize:20,flexShrink:0}}>📍</span>{address}</div>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background:'#E8A000', padding:'14px 0', textAlign:'center' }}>
        <span style={{ color:'#fff', fontSize:14 }}>Copyright 2026 © <strong>METIK</strong>. All rights reserved</span>
      </div>
    </footer>
  )
}
