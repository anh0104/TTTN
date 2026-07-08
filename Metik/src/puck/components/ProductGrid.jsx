import React from 'react'

export default function ProductGrid({ title = 'SẢN PHẨM MỚI', products, showTitle = true } = {}) {
  const safeProducts = Array.isArray(products) ? products : [
    { name: 'Snack vị Tảo biển', image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80', link: '/san-pham/snack-vi-tao-bien' },
    { name: 'Snack vị BBQ', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80', link: '/san-pham/snack-vi-bbq' },
    { name: 'Snack vị Bắp', image: 'https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80', link: '/san-pham/snack-vi-bap' },
    { name: 'Snack vị Phô mai', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', link: '/san-pham/snack-vi-pho-mai' },
  ]
  const fb = ['https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80','https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80','https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80','https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80']
  return (
    <section style={{ padding: '48px 0', background: '#FDFAF4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {showTitle && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ color: '#2E7D32', fontSize: 26, fontWeight: 800, textTransform: 'uppercase', display: 'inline-block' }}>
              {title}
              <div style={{ height: 4, background: '#F5C518', marginTop: 4, borderRadius: 2 }} />
            </h2>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(safeProducts.length,4)},1fr)`, gap: 20 }}>
          {safeProducts.map((p, i) => (
            <a key={i} href={p.link || '#'} style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: 12, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ height: 240, overflow: 'hidden', background: '#f5f5f5' }}>
                  <img src={p.image || fb[i%fb.length]} alt={p.name || ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => e.target.src = fb[i%fb.length]} />
                </div>
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ color: '#E07820', fontWeight: 700, fontSize: 15 }}>{p.name || ''}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
