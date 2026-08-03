/**
 * pages/client/NewsListPage.jsx
 * ------------------------------------------------------
 * Danh sách tin tức, có phân trang.
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import newsService from '../../services/newsService';
import Pagination from '../../components/common/Pagination';
import Loader from '../../components/common/Loader';
import { getImageUrl, formatDate, truncateText } from '../../utils/format';

const NewsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [newsList, setNewsList] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    newsService
      .getAll({ page, limit: 9 })
      .then((res) => {
        setNewsList(res.data.data);
        setMeta(res.data.meta);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="container-custom section-padding animate-fade-in">
      <h1 className="heading-display mb-8 text-center text-2xl font-semibold md:text-3xl">Tin tức HomeSpace</h1>

      {loading ? (
        <Loader fullScreen />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news) => (
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
                  <p className="mt-2 line-clamp-3 text-sm text-dark/60 dark:text-gray-light/60">
                    {truncateText(news.content?.replace(/<[^>]+>/g, ''), 120)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {meta && (
            <Pagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
              onPageChange={(p) => setSearchParams({ page: p })}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewsListPage;
