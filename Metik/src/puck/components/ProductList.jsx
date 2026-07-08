import React from 'react'
const FB=['https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80','https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80','https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80','https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80']
export default function ProductList({ breadcrumb='TRANG CHỦ / SẢN PHẨM', products } = {}) {
  const sp = Array.isArray(products)?products:[{name:'Snack vị Bắp',slug:'snack-vi-bap',image:FB[0]},{name:'Snack vị BBQ',slug:'snack-vi-bbq',image:FB[1]},{name:'Snack vị Phô mai',slug:'snack-vi-pho-mai',image:FB[2]},{name:'Snack vị Tảo biển',slug:'snack-vi-tao-bien',image:FB[3]}]
  const parts = (breadcrumb||'').split('/')
  return (
    <section style={{ background:'#fff', padding:'32px 0 64px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ fontSize:14, color:'#888', marginBottom:32 }}>
          {parts.map((b,i)=>(<span key={i}>{i<parts.length-1?<a href={i===0?'/':'/san-pham'} style={{color:'#888',textDecoration:'none'}}>{b.trim()}</a>:<strong style={{color:'#222'}}>{b.trim()}</strong>}{i<parts.length-1&&<span style={{margin:'0 6px'}}>/</span>}</span>))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
          {sp.map((p,i)=>(
            <a key={i} href={`/san-pham/${p.slug||'san-pham'}`} style={{textDecoration:'none'}}>
              <div style={{ background:'#fff', borderRadius:12, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', border:'1px solid #eee', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <div style={{height:260,overflow:'hidden',background:'#f8f8f8'}}>
                  <img src={p.image||FB[i%4]} alt={p.name||''} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} onError={e=>e.target.src=FB[i%4]}/>
                </div>
                <div style={{padding:'14px 16px 18px',textAlign:'center'}}>
                  <span style={{color:'#E07820',fontWeight:700,fontSize:15}}>{p.name||''}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
