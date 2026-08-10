

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../utils/format';

const AUTO_PLAY_INTERVAL = 5000;

const DEFAULT_BANNERS = [
  {
    id: 'def-1',
    title: 'Kiến Tạo Không Gian Sống Tinh Tế - Minimal Luxury 2026',
    link: '/san-pham',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'def-2',
    title: 'Bộ Sưu Tập Sofa & Bàn Ăn Gỗ Tự Nhiên Cao Cấp',
    link: '/san-pham',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
  },
];

const HeroSlider = ({ banners }) => {
  const activeBanners = (banners && banners.length > 0) ? banners : DEFAULT_BANNERS;
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (!activeBanners.length) return;
      setCurrent((index + activeBanners.length) % activeBanners.length);
    },
    [activeBanners.length]
  );

  useEffect(() => {
    if (activeBanners.length <= 1) return undefined;
    const timer = setInterval(() => goTo(current + 1), AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [current, activeBanners.length, goTo]);

  return (
    <section className="relative overflow-hidden bg-gray-light dark:bg-neutral-900">
      <div className="relative aspect-[16/7] w-full min-h-[300px] md:min-h-[420px]">
        {activeBanners.map((banner, index) => (
          <Link
            key={banner.id}
            to={banner.link || '/san-pham'}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <img
  src={getImageUrl(banner.image)}
  alt={banner.title || 'Banner HomeSpace'}
  className="h-full w-full object-cover"
/>

<div className="container-custom absolute bottom-8 left-1/2 -translate-x-1/2 text-center md:bottom-14 md:left-8 md:translate-x-0 md:text-left">
  {banner.title && (
    <h2 className="heading-display max-w-md text-2xl font-semibold text-white drop-shadow md:text-4xl">
      {banner.title}
    </h2>
  )}
</div>
          </Link>
        ))}

        {activeBanners.length > 1 && (
          <>
            <button
              onClick={() => goTo(current - 1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-dark transition-colors hover:bg-white md:left-6"
              aria-label="Banner trước"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-dark transition-colors hover:bg-white md:right-6"
              aria-label="Banner tiếp theo"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-5">
              {activeBanners.map((banner, index) => (
                <button
                  key={banner.id}
                  onClick={() => goTo(index)}
                  aria-label={`Xem banner ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSlider;
