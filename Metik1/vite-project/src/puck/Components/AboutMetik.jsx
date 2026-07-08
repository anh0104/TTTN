import React from 'react'
const I1='https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80'
const I2='https://images.pexels.com/photos/30575177/pexels-photo-30575177.jpeg?_gl=1*hcqnop*_ga*MTg4MTQ2ODAyOC4xNzgzMTMwNjM1*_ga_8JE65Q40S6*czE3ODMxMzA2MzUkbzEkZzEkdDE3ODMxMzEwNzUkajYwJGwwJGgw'
const I3='https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&q=80'
export default function AboutMetik({ 
  sectionTitle='GIỚI THIỆU VỀ METIK', 
  intro='metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nịp sống hiện đại.',
  image1=I1, text1='Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng. Sản phẩm được nghiên cứu với nhiều hương vị hấp dẫn như rong biển, bắp, phô mai, BBQ và các hương vị đặc trưng khác.', 
  bullets, 
  image2=I2, text2='Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.', 
  image3=I3, text3='Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.' }={}) {
  const bs = Array.isArray(bullets) ? bullets.map(b=>typeof b==='string'?b:(b?.text||'')) : ['Với tinh thần “Chạm mê tít – Snap into Joy”, metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.','metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.']
  const Section = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center', marginBottom:56 }}>{children}</div>
  const Img = ({ src, h=320 }) => <div style={{ borderRadius:16, overflow:'hidden' }}><img src={src} alt="" style={{ width:'100%',height:h,objectFit:'cover',display:'block',borderRadius:16 }} onError={e=>e.target.style.opacity=0.2}/></div>
  return (
    <section style={{ background:'#FDFAF4', padding:'64px 0' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ marginBottom:24 }}><h2 style={{ color:'#2E7D32', fontSize:22, fontWeight:800, textTransform:'uppercase', display:'inline-block' }}>{sectionTitle}<div style={{ height:4,background:'#F5C518',marginTop:4,borderRadius:2 }}/></h2></div>
        <p style={{ color:'#444', fontSize:16, lineHeight:1.85, marginBottom:48 }}>{intro}</p>
        <Section><Img src={image1}/><p style={{ color:'#444',fontSize:16,lineHeight:1.9 }}>{text1}</p></Section>
        <Section>
          <p
            style={{
            color:'#444',
            fontSize:16,
            lineHeight:1.9,
            whiteSpace:'pre-line'
            }}
          >
          {text2}
          </p>

          <Img src={image2} h={280}/>
        </Section>
        <Section>
          <Img src={image3}/>
          <p
            style={{
            color:'#444',
            fontSize:16,
            lineHeight:1.9
            }}
          >
          {text3}
          </p>
        </Section>      
      </div>
    </section>
  )
}
