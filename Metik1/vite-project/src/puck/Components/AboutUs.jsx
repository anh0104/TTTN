import React, { useState } from 'react'
export default function AboutUs({ sectionTitle='VỀ CHÚNG TÔI', text1='Với tinh thần "Chạm mê tít – Snap into Joy", metik mong muốn trở thành người bạn đồng hành.', text2='metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói.', videoUrl='', videoThumb='' }={}) {
  const [playing,setPlaying]=useState(false)
  const url=videoUrl||'https://www.youtube.com/embed/dQw4w9WgXcQ'
  return (
    <section style={{ background:'#FFF8E8', padding:'64px 0' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ marginBottom:28 }}><h2 style={{ color:'#2E7D32',fontSize:22,fontWeight:800,textTransform:'uppercase',display:'inline-block' }}>{sectionTitle}<div style={{ height:4,background:'#F5C518',marginTop:4,borderRadius:2 }}/></h2></div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center' }}>
          <div>
            <p style={{ color:'#333',fontSize:16,lineHeight:1.9,marginBottom:24 }} dangerouslySetInnerHTML={{ __html:(text1||'').replace(/metik/g,'<strong>metik</strong>') }}/>
            <p style={{ color:'#333',fontSize:16,lineHeight:1.9 }} dangerouslySetInnerHTML={{ __html:(text2||'').replace(/metik/g,'<strong>metik</strong>') }}/>
          </div>
          <div style={{ borderRadius:12,overflow:'hidden',background:'#111',aspectRatio:'16/9',position:'relative',cursor:'pointer' }} onClick={()=>setPlaying(true)}>
            {!playing ? <>
              {videoThumb&&<img src={videoThumb} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }} onError={e=>e.target.style.display='none'}/>}
              <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:videoThumb?'rgba(0,0,0,0.2)':'rgba(0,0,0,0.5)' }}><div style={{ width:60,height:60,borderRadius:'50%',background:'rgba(255,255,255,0.9)',display:'flex',alignItems:'center',justifyContent:'center' }}><span style={{ fontSize:22,marginLeft:4 }}>▶</span></div></div>
            </> : <iframe src={url+'?autoplay=1'} style={{ width:'100%',height:'100%',border:'none' }} allow="autoplay;fullscreen" title="video"/>}
          </div>
        </div>
      </div>
    </section>
  )
}
