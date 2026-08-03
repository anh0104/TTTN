/**
 * pages/NotFoundPage.jsx
 */
import { Link } from 'react-router-dom';
const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-white text-dark dark:bg-dark dark:text-gray-light">
    <h1 className="heading-display text-5xl font-bold text-wood dark:text-accent">404</h1>
    <p className="text-dark/70 dark:text-gray-light/70">Không tìm thấy trang bạn yêu cầu</p>
    <Link to="/" className="text-wood underline dark:text-accent">Về trang chủ</Link>
  </div>
);
export default NotFoundPage;
