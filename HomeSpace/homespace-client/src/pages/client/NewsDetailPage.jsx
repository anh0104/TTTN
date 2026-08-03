/**
 * pages/client/NewsDetailPage.jsx
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import newsService from '../../services/newsService';
import Loader from '../../components/common/Loader';
import { getImageUrl, formatDate } from '../../utils/format';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    newsService
      .getBySlug(slug)
      .then((res) => setNews(res.data.data))
      .catch((err) => console.error('Lỗi tải chi tiết tin tức:', err))
      .finally(() => setLoading(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) return <Loader fullScreen />;

  if (!news) {
    return (
      <div className="container-custom section-padding text-center">
        <p className="text-dark/60 dark:text-gray-light/60">Không tìm thấy bài viết.</p>
        <Link to="/tin-tuc" className="mt-3 inline-block text-wood underline dark:text-accent">
          Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  return (
    <article className="container-custom section-padding animate-fade-in">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-4 text-sm text-dark/50 dark:text-gray-light/50">
          <Link to="/" className="hover:text-wood dark:hover:text-accent">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/tin-tuc" className="hover:text-wood dark:hover:text-accent">Tin tức</Link>
        </nav>

        <h1 className="heading-display text-2xl font-semibold md:text-4xl">{news.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-dark/50 dark:text-gray-light/50">
          <span>{formatDate(news.created_at)}</span>
          {news.author?.name && (
            <>
              <span>•</span>
              <span>{news.author.name}</span>
            </>
          )}
        </div>

        {news.image && (
          <div className="mt-6 aspect-video overflow-hidden rounded-xl bg-gray-light dark:bg-neutral-800">
            <img src={getImageUrl(news.image)} alt={news.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="prose prose-neutral mt-8 max-w-none leading-relaxed text-dark/80 dark:prose-invert dark:text-gray-light/80">
          {news.content}
        </div>

        <Link to="/tin-tuc" className="mt-10 inline-block text-wood hover:underline dark:text-accent">
          ← Quay lại danh sách tin tức
        </Link>
      </div>
    </article>
  );
};

export default NewsDetailPage;
