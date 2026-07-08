import React, { useState } from 'react'
const FB='https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80'
const RFB=['https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80','https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80','https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80']
export default function ProductDetail({ name='Snack vị BBQ', image='', image2='', breadcrumbBg='', category='Các sản phẩm bánh METIK', description='Snack METIK vị BBQ là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến.', details, related }={}) {
  const [main,setMain]=useState(image||FB)
  const ds=Array.isArray(details)?details:[{bold:'Hương vị BBQ đậm đà, kết cấu giòn',text:'Snack có mùi thơm rõ của gia vị BBQ, vị mặn ngọt hài hòa.'},{bold:'Công thức được nghiên cứu bài bản',text:'Sản phẩm trải qua quá trình nghiên cứu hương vị bởi đội ngũ R&D.'}]
  const rl=Array.isArray(related)?related:[{name:'Snack vị Bắp',slug:'snack-vi-bap',image:RFB[0]},{name:'Snack vị Phô mai',slug:'snack-vi-pho-mai',image:RFB[1]},{name:'Snack vị Tảo biển',slug:'snack-vi-tao-bien',image:RFB[2]}]
  return (
    <div style={{ background:'#fff' }}>
      <div style={{ position:'relative',height:100,overflow:'hidden',background:'#333' }}>
        {breadcrumbBg&&<img src={breadcrumbBg} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.4 }} onError={e=>e.target.style.display='none'}/>}
        <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',padding:'0 32px' }}><span style={{ color:'#ccc',fontSize:14 }}><a href="/" style={{ color:'#ccc',textDecoration:'none' }}>TRANG CHỦ</a> / <a href="/san-pham" style={{ color:'#ccc',textDecoration:'none' }}>SẢN PHẨM</a> / <span style={{ color:'#fff' }}>CÁC SẢN PHẨM BÁNH METIK</span></span></div>
      </div>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'start' }}>
          <div>
            <div style={{ borderRadius:12,overflow:'hidden',marginBottom:12 }}><img src={main||FB} alt={name} style={{ width:'100%',height:420,objectFit:'cover',display:'block',borderRadius:12 }} onError={e=>e.target.src=FB}/></div>
            {image2&&<div style={{ display:'flex',gap:10 }}>{[image||FB,image2].map((img,i)=><img key={i} src={img} alt="" onClick={()=>setMain(img)} style={{ width:80,height:60,objectFit:'cover',borderRadius:6,cursor:'pointer',border:main===img?'2px solid #F5A800':'2px solid #eee' }} onError={e=>e.target.src=FB}/>)}</div>}
          </div>
          <div>
            <h1 style={{ fontSize:26,fontWeight:800,color:'#222',marginBottom:12 }}>{name}</h1>
            <div style={{ width:40,height:3,background:'#ddd',marginBottom:20,borderRadius:2 }}/>
            <p style={{ color:'#555',fontSize:15,lineHeight:1.8,marginBottom:20 }}>{description}</p>
            <div style={{ marginBottom:20 }}><span style={{ color:'#666',fontSize:14 }}>Danh mục: </span><a href="/san-pham" style={{ color:'#2E7D32',textDecoration:'none',fontSize:14,fontWeight:600 }}>{category}</a></div>
            <div style={{ display:'flex',gap:8 }}>
              <a href="#" style={{ width:36,height:36,borderRadius:'50%',background:'#1877F2',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',textDecoration:'none',fontWeight:800,fontSize:16 }}>f</a>
              <a href="#" style={{ width:36,height:36,borderRadius:'50%',background:'#0077B5',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',textDecoration:'none',fontWeight:700,fontSize:13 }}>in</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop:56,paddingTop:40,borderTop:'1px solid #eee' }}>
          <div style={{ textAlign:'center',marginBottom:32 }}><div style={{ width:60,height:3,background:'#F5A800',margin:'0 auto 10px',borderRadius:2 }}/><h2 style={{ fontSize:16,fontWeight:700,textTransform:'uppercase',color:'#333',letterSpacing:'0.08em' }}>CHI TIẾT SẢN PHẨM</h2></div>
          {ds.map((d,i)=><p key={i} style={{ color:'#444',fontSize:15,lineHeight:1.8,marginBottom:16 }}><strong>{d.bold}:</strong> {d.text}</p>)}
        </div>
        <div style={{ marginTop:56 }}>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#222',marginBottom:24 }}>SẢN PHẨM LIÊN QUAN</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {rl.map((r,i)=><a key={i} href={`/san-pham/${r.slug||'sp'}`} style={{ textDecoration:'none' }}><div style={{ borderRadius:12,overflow:'hidden',border:'1px solid #eee',transition:'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}><img src={r.image||RFB[i%3]} alt={r.name||''} style={{ width:'100%',height:220,objectFit:'cover',display:'block' }} onError={e=>e.target.src=RFB[i%3]}/><div style={{ padding:'12px 16px',textAlign:'center' }}><span style={{ color:'#E07820',fontWeight:700,fontSize:15 }}>{r.name||''}</span></div></div></a>)}
          </div>
        </div>
      </div>
    </div>
  )
}
