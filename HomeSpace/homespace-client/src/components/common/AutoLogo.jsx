/**
 * components/common/AutoLogo.jsx
 * ------------------------------------------------------
 * Component Logo Thông Minh:
 * - Tự động xóa nền trắng của ảnh Logo khi bỏ ảnh vào (HTML5 Canvas pixel processing)
 * - Tự động làm trong suốt nền trắng 100% để hiển thị sắc nét trên cả Light & Dark mode
 * - Fallback CSS blend-mode nếu ảnh load từ domain ngoài
 * ------------------------------------------------------
 */

import { useEffect, useState, useRef } from 'react';

const AutoLogo = ({ src, alt = 'HomeSpace Logo', className = 'h-10 w-auto object-contain', fallbackText = 'HomeSpace' }) => {
  const [processedSrc, setProcessedSrc] = useState(src);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setProcessedSrc(null);
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          if (isMounted) setProcessedSrc(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Quét từng pixel và xóa các pixel màu trắng / gần trắng (RGB > 235)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Nếu màu tiệm cận trắng (R,G,B đều > 235), chuyển độ đục (alpha) = 0
          if (r > 235 && g > 235 && b > 235) {
            data[i + 3] = 0; // Alpha = 0 (Trong suốt)
          } else if (r > 210 && g > 210 && b > 210) {
            // Tối ưu viền: làm mờ dần viền xám sáng
            const factor = (255 - Math.max(r, g, b)) / 45;
            data[i + 3] = Math.round(data[i + 3] * factor);
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const transparentDataUrl = canvas.toDataURL('image/png');
        if (isMounted) {
          setProcessedSrc(transparentDataUrl);
        }
      } catch (err) {
        console.warn('CORS hoặc Canvas error khi tự động xóa nền logo, sử dụng fallback CSS:', err);
        if (isMounted) setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      if (isMounted) setProcessedSrc(src);
    };

    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (!src) {
    return (
      <span className="heading-display font-bold text-wood dark:text-accent tracking-tight text-2xl md:text-3xl transition-all">
        {fallbackText}
      </span>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <canvas ref={canvasRef} className="hidden" />
      <img
        src={processedSrc || src}
        alt={alt}
        className={`${className} mix-blend-multiply dark:mix-blend-screen dark:brightness-110 transition-all duration-300`}
        onError={(e) => {
          e.target.src = src;
        }}
      />
    </div>
  );
};

export default AutoLogo;
