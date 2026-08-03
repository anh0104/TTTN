/**
 * components/layout/Footer.jsx
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Camera, Video, MapPin, Phone, Mail, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../common/Button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Ghi chú: hệ thống hiện chưa có bảng lưu newsletter subscribers,
    // đây là phản hồi UI tạm thời cho trải nghiệm người dùng.
    toast.success('Cảm ơn bạn đã đăng ký nhận bản tin từ HomeSpace!');
    setEmail('');
  };

  return (
    <footer className="border-t border-wood/15 bg-gray-light dark:border-gray-light/10 dark:bg-neutral-950">
      {/* Newsletter */}
      <div className="border-b border-wood/10 dark:border-gray-light/10">
        <div className="container-custom flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="heading-display text-xl font-semibold text-wood dark:text-accent">
              Đăng ký nhận bản tin
            </h3>
            <p className="mt-1 text-sm text-dark/60 dark:text-gray-light/60">
              Nhận thông tin ưu đãi và bộ sưu tập mới nhất từ HomeSpace
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full rounded-lg border border-wood/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900 dark:focus:border-accent"
            />
            <Button type="submit" className="shrink-0">
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="heading-display text-xl font-semibold text-wood dark:text-accent">HomeSpace</span>
          <p className="mt-3 text-sm leading-relaxed text-dark/60 dark:text-gray-light/60">
            Nội thất hiện đại, phong cách Minimal Luxury - kiến tạo không gian sống tinh tế cho ngôi nhà của bạn.
          </p>
          <div className="mt-4 flex gap-3">
            {[MessageCircle, Camera, Video].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-wood transition-colors hover:bg-wood hover:text-white dark:bg-neutral-900 dark:text-accent dark:hover:bg-accent dark:hover:text-dark"
                aria-label="Mạng xã hội"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-dark dark:text-gray-light">Liên kết nhanh</h4>
          <ul className="mt-3 space-y-2 text-sm text-dark/60 dark:text-gray-light/60">
            <li><Link to="/" className="hover:text-wood dark:hover:text-accent">Trang chủ</Link></li>
            <li><Link to="/san-pham" className="hover:text-wood dark:hover:text-accent">Sản phẩm</Link></li>
            <li><Link to="/tin-tuc" className="hover:text-wood dark:hover:text-accent">Tin tức</Link></li>
            <li><Link to="/gio-hang" className="hover:text-wood dark:hover:text-accent">Giỏ hàng</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-dark dark:text-gray-light">Danh mục nổi bật</h4>
          <ul className="mt-3 space-y-2 text-sm text-dark/60 dark:text-gray-light/60">
            <li><Link to="/san-pham?category=1" className="hover:text-wood dark:hover:text-accent">Sofa</Link></li>
            <li><Link to="/san-pham?category=2" className="hover:text-wood dark:hover:text-accent">Bàn ăn</Link></li>
            <li><Link to="/san-pham?category=3" className="hover:text-wood dark:hover:text-accent">Giường ngủ</Link></li>
            <li><Link to="/san-pham?isBest=true" className="hover:text-wood dark:hover:text-accent">Bán chạy nhất</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-dark dark:text-gray-light">Liên hệ</h4>
          <ul className="mt-3 space-y-2.5 text-sm text-dark/60 dark:text-gray-light/60">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-wood dark:text-accent" />
              123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-wood dark:text-accent" /> 1900 1234
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-wood dark:text-accent" /> contact@homespace.vn
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-wood/10 py-5 text-center text-sm text-dark/50 dark:border-gray-light/10 dark:text-gray-light/50">
        © {new Date().getFullYear()} HomeSpace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
