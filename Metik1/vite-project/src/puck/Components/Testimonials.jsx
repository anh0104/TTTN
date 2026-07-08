import React from 'react'
export default function Testimonials({ title='KHÁCH HÀNG NÓI GÌ?', reviews }={}) {
  const rv = Array.isArray(reviews) ? reviews : [
    { name:'Sinh viên Huỳnh Vĩnh, TP.HCM', avatar:'https://i.pravatar.cc/80?img=11', stars:5, text:'Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng!' },
    { name:'Bạn Mỹ Duyên, Đồng Tháp', avatar:'https://i.pravatar.cc/80?img=5', stars:5, text:'"metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu."' },
  ]
  return (
    <section style={{ background:'linear-gradient(180deg,#FFF3C0,#FFE066)', padding:'56px 0' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ marginBottom:36 }}><h2 style={{ color:'#2E7D32',fontSize:22,fontWeight:800,textTransform:'uppercase',display:'inline-block' }}>{title}<div style={{ height:4,background:'#F5C518',marginTop:4,borderRadius:2 }}/></h2></div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }}>
          {rv.map((r,i)=>(
            <div key={i} style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
              <img src={r.avatar||'https://i.pravatar.cc/80'} alt="" style={{ width:72,height:72,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:'3px solid #FFD700' }} onError={e=>e.target.src='https://i.pravatar.cc/80'}/>
              <div>
                <div style={{ color:'#FFD700',fontSize:18,marginBottom:10 }}>{'★'.repeat(Math.min(r.stars||5,5))}</div>
                <p style={{ color:'#444',fontSize:15,lineHeight:1.7,fontStyle:'italic',marginBottom:14 }}>{r.text||''}</p>
                <p style={{ fontWeight:700,color:'#222',fontSize:14 }}>{r.name||''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}