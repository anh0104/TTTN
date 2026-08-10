/**
 * components/layout/Footer.jsx
 * ------------------------------------------------------
 * Footer màu xanh Forest Green đậm sang trọng, sắc nét
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Camera, Video, MapPin, Phone, Mail, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Button from '../common/Button';
import { getImageUrl } from '../../utils/format';
import AutoLogo from '../common/AutoLogo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const logo = useSelector((state) => state.setting?.settings?.logo);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Cảm ơn bạn đã đăng ký nhận bản tin từ HomeSpace!');
    setEmail('');
  };

  return (
    <footer className="border-t border-wood/20 bg-[#284c38] text-white dark:bg-neutral-950">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 bg-black/15">
        <div className="container-custom flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="heading-display text-2xl font-bold text-accent">
              Đăng ký nhận bản tin
            </h3>
            <p className="mt-1 text-sm text-white/80">
              Nhận thông tin ưu đãi và bộ sưu tập Minimal Luxury mới nhất từ HomeSpace
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn..."
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm focus:border-accent focus:bg-white/20 transition-all"
            />
            <Button type="submit" className="shrink-0 bg-accent hover:bg-accent-600 text-dark font-bold">
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={getImageUrl(logo)}
            alt="HomeSpace Logo"
            className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/75 font-medium">
            Nội thất hiện đại, phong cách Minimal Luxury - kiến tạo không gian sống tinh tế cho ngôi nhà của bạn.
          </p>
          <div className="mt-5 flex gap-3">
            {[MessageCircle, Camera, Video].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent transition-all hover:bg-accent hover:text-dark hover:scale-105 shadow-sm"
                aria-label="Mạng xã hội"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-accent text-base uppercase tracking-wider">Liên kết nhanh</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80 font-medium">
            <li><Link to="/" className="hover:text-accent transition-colors">Trang chủ</Link></li>
            <li><Link to="/san-pham" className="hover:text-accent transition-colors">Sản phẩm</Link></li>
            <li><Link to="/tin-tuc" className="hover:text-accent transition-colors">Tin tức</Link></li>
            <li><Link to="/gio-hang" className="hover:text-accent transition-colors">Giỏ hàng</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-accent text-base uppercase tracking-wider">Danh mục nổi bật</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80 font-medium">
            <li><Link to="/san-pham?category=1" className="hover:text-accent transition-colors">Sofa cao cấp</Link></li>
            <li><Link to="/san-pham?category=2" className="hover:text-accent transition-colors">Bàn ăn hiện đại</Link></li>
            <li><Link to="/san-pham?category=3" className="hover:text-accent transition-colors">Giường ngủ Minimalist</Link></li>
            <li><Link to="/san-pham?isBest=true" className="hover:text-accent transition-colors">Bán chạy nhất</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-accent text-base uppercase tracking-wider">Thông tin liên hệ</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80 font-medium">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
              <span>123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={18} className="shrink-0 text-accent" /> 
              <span className="font-semibold">1900 1234</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={18} className="shrink-0 text-accent" /> 
              <span>contact@homespace.vn</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs font-semibold text-white/60">
        © {new Date().getFullYear()} HomeSpace Minimal Luxury Interior. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
