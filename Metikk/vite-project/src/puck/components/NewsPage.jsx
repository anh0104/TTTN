import React, { useState } from 'react'
export default function NewsPage({ title='LƯU TRỮ DANH MỤC: TIN TỨC', emptyMessage='Không tìm thấy gì', emptyDesc='Dường như chúng tôi không thể tìm thấy những gì bạn đang tìm kiếm. Có lẽ tìm kiếm có thể giúp ích.', articles } = {}) {
  const [q,setQ]=useState('')
  const arts = Array.isArray(articles)?articles:[]
  return (
    <section style={{background:'#fff',padding:'48px 0 80px'}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 32px'}}>
        <h1 style={{fontSize:18,fontWeight:700,textTransform:'uppercase',color:'#333',textAlign:'center',marginBottom:40,letterSpacing:'0.06em'}}>{title}</h1>
        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:48}}>
          <div>
            {arts.length===0?(
              <div>
                <h2 style={{fontSize:22,fontWeight:700,color:'#222',marginBottom:10}}>{emptyMessage}</h2>
                <p style={{color:'#666',fontSize:15,marginBottom:24}}>{emptyDesc}</p>
                <div style={{display:'flex',gap:0}}>
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm kiếm..." style={{flex:1,padding:'10px 16px',border:'1px solid #ddd',borderRight:'none',borderRadius:'4px 0 0 4px',fontSize:14,outline:'none'}}/>
                  <button style={{background:'#2E7D32',color:'#fff',border:'none',padding:'10px 16px',borderRadius:'0 4px 4px 0',cursor:'pointer',fontSize:16}}>🔍</button>
                </div>
              </div>
            ):(
              arts.map((a,i)=>(
                <div key={i} style={{display:'flex',gap:20,paddingBottom:32,borderBottom:'1px solid #eee',marginBottom:32}}>
                  {a.image&&<img src={a.image} alt="" style={{width:180,height:120,objectFit:'cover',borderRadius:8,flexShrink:0}}/>}
                  <div>
                    <div style={{color:'#999',fontSize:12,marginBottom:8}}>{a.date||''}</div>
                    <h3 style={{color:'#222',fontWeight:700,fontSize:17,marginBottom:10}}><a href={a.link||'#'} style={{textDecoration:'none',color:'inherit'}}>{a.title||''}</a></h3>
                    <p style={{color:'#666',fontSize:14,lineHeight:1.6}}>{a.excerpt||''}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div>
            <div style={{display:'flex',gap:0}}>
              <input placeholder="Tìm kiếm..." style={{flex:1,padding:'10px 14px',border:'1px solid #ddd',borderRight:'none',borderRadius:'4px 0 0 4px',fontSize:14,outline:'none'}}/>
              <button style={{background:'#2E7D32',color:'#fff',border:'none',padding:'10px 14px',borderRadius:'0 4px 4px 0',cursor:'pointer',fontSize:16}}>🔍</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
