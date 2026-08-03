/**
 * components/home/NewsSection.jsx
 * ------------------------------------------------------
 */

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImageUrl, formatDate, truncateText } from '../../utils/format';

const NewsSection = ({ newsList }) => {
  if (!newsList || newsList.length === 0) return null;

  return (
    <section className="container-custom section-padding">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="heading-display text-2xl font-semibold md:text-3xl">Tin tức mới</h2>
        <Link to="/tin-tuc" className="hidden items-center gap-1 text-sm font-medium text-wood hover:underline dark:text-accent sm:flex">
          Xem tất cả <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsList.slice(0, 3).map((news) => (
          <Link
            key={news.id}
            to={`/tin-tuc/${news.slug}`}
            className="group overflow-hidden rounded-xl border border-wood/10 bg-white transition-shadow hover:shadow-lg dark:border-gray-light/10 dark:bg-neutral-900"
          >
            <div className="aspect-video overflow-hidden bg-gray-light dark:bg-neutral-800">
              <img
                src={getImageUrl(news.image)}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-dark/50 dark:text-gray-light/50">{formatDate(news.created_at)}</span>
              <h3 className="mt-1 line-clamp-2 font-medium group-hover:text-wood dark:group-hover:text-accent">
                {news.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-dark/60 dark:text-gray-light/60">
                {truncateText(news.content?.replace(/<[^>]+>/g, ''), 90)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
