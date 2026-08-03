/**
 * components/product/ProductGallery.jsx
 * ------------------------------------------------------
 * Gallery nhiều ảnh sản phẩm: ảnh chính lớn + dải thumbnail bên dưới,
 * hỗ trợ Zoom ảnh khi di chuột (desktop) theo kiểu magnifier lens.
 * ------------------------------------------------------
 */

import { useState, useRef } from 'react';
import { getImageUrl } from '../../utils/format';

const ProductGallery = ({ thumbnail, images = [] }) => {
  const allImages = [thumbnail, ...images.map((img) => img.image)].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${getImageUrl(allImages[activeIndex])})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  return (
    <div>
      {/* Ảnh chính + zoom lens (chỉ desktop, dùng group-hover) */}
      <div
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomStyle({ display: 'none' })}
        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-light dark:bg-neutral-800"
      >
        <img
          src={getImageUrl(allImages[activeIndex])}
          alt="Ảnh sản phẩm"
          className="h-full w-full object-cover"
        />
        {/* Lớp phủ zoom - hiện khi hover trên desktop */}
        <div
          className="pointer-events-none absolute inset-0 hidden bg-no-repeat md:group-hover:block"
          style={{ ...zoomStyle, backgroundSize: '200%' }}
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                index === activeIndex ? 'border-wood dark:border-accent' : 'border-transparent'
              }`}
            >
              <img src={getImageUrl(img)} alt={`Ảnh ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
