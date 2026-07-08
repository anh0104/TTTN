import React, { useState } from 'react'

export default function AboutPage({
  text1 = 'Với tinh thần "Chạm mê tít – Snap into Joy", metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày.',
  text2 = 'metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh.',
  videoUrl = '',
  videoThumb = '',
} = {}) {
  const [playing, setPlaying] = useState(false)
  const safeUrl = videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  return (
    <section style={{ background: '#fff', padding: '72px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', background: '#111', aspectRatio: '16/9', position: 'relative', cursor: 'pointer' }}
            onClick={() => setPlaying(true)}>
            {!playing ? (
              <>
                {videoThumb && <img src={videoThumb} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }} onError={e=>e.target.style.display='none'} />}
                <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:videoThumb?'rgba(0,0,0,0.25)':'rgba(0,0,0,0.6)' }}>
                  <div style={{ width:56,height:56,borderRadius:'50%',background:'rgba(255,255,255,0.9)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <span style={{ fontSize:20,marginLeft:4 }}>▶</span>
                  </div>
                </div>
                <div style={{ position:'absolute',bottom:0,left:0,right:0,background:'rgba(0,0,0,0.8)',padding:'5px 10px',display:'flex',alignItems:'center',gap:8 }}>
                  <span style={{ color:'#fff',fontSize:11 }}>▶  00:00</span>
                  <div style={{ flex:1,height:3,background:'#555',borderRadius:2 }} />
                  <span style={{ color:'#fff',fontSize:11 }}>00:18  🔊</span>
                </div>
              </>
            ) : (
              <iframe src={safeUrl+'?autoplay=1'} style={{ width:'100%',height:'100%',border:'none' }} allow="autoplay;fullscreen" title="video" />
            )}
          </div>
          <div>
            <p style={{ color:'#333',fontSize:16,lineHeight:1.9,marginBottom:24 }}
              dangerouslySetInnerHTML={{ __html: (text1||'').replace(/metik/g,'<strong>metik</strong>') }} />
            <p style={{ color:'#333',fontSize:16,lineHeight:1.9 }}
              dangerouslySetInnerHTML={{ __html: (text2||'').replace(/metik/g,'<strong>metik</strong>') }} />
          </div>
        </div>
      </div>
    </section>
  )
}
