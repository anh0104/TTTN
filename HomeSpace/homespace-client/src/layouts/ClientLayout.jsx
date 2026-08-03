/**
 * layouts/ClientLayout.jsx
 * ------------------------------------------------------
 * Layout bao ngoài toàn bộ trang phía Client (Header + nội dung + Footer).
 * ------------------------------------------------------
 */

import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ClientLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-dark dark:bg-dark dark:text-gray-light">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
