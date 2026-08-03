/**
 * components/home/CollectionShowcase.jsx
 * ------------------------------------------------------
 * "Bộ sưu tập" - showcase 3 danh mục nổi bật dạng tile lớn,
 * dùng ảnh sản phẩm đại diện của danh mục làm hình nền.
 * ------------------------------------------------------
 */

import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/format';

const CollectionShowcase = ({ collections }) => {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="container-custom section-padding">
      <h2 className="heading-display text-center text-2xl font-semibold md:text-3xl">Bộ sưu tập</h2>
      <p className="mt-2 text-center text-sm text-dark/60 dark:text-gray-light/60">
        Những bộ sưu tập nội thất được tuyển chọn theo phong cách sống
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {collections.map(({ category, image }) => (
          <Link
            key={category.id}
            to={`/san-pham?category=${category.id}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-light dark:bg-neutral-800"
          >
            <img
              src={getImageUrl(image)}
              alt={category.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="heading-display text-xl font-semibold text-white">{category.name}</span>
              <p className="mt-1 text-sm text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                Khám phá ngay →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionShowcase;
