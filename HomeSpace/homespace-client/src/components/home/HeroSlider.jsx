

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../utils/format';

const AUTO_PLAY_INTERVAL = 5000;

const HeroSlider = ({ banners }) => {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (!banners.length) return;
      setCurrent((index + banners.length) % banners.length);
    },
    [banners.length]
  );

  useEffect(() => {
    if (banners.length <= 1) return undefined;
    const timer = setInterval(() => goTo(current + 1), AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [current, banners.length, goTo]);

  if (!banners || banners.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-gray-light dark:bg-neutral-900">
      <div className="relative aspect-[16/7] w-full min-h-[280px] md:min-h-[380px]">
        {banners.map((banner, index) => (
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

        {banners.length > 1 && (
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
              {banners.map((banner, index) => (
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
