import React from 'react';
import AdminHeader from '../components/admin-header.jsx';
import AdminHeroSenHong from '../components/admin-hero-senhong.jsx';
import AdminMemberLogos from '../components/admin-member-logos.jsx';
import AdminDepartmentCards from '../components/admin-department-cards.jsx';
import AdminStatsLotus from '../components/admin-stats-lotus.jsx';
import AdminAboutOrg from '../components/admin-about-org.jsx';
import AdminNewsFeatured from '../components/admin-news-featured.jsx';
import AdminValueCardsOverlap from '../components/admin-value-cards-overlap.jsx';
import AdminNewsGridSmall from '../components/admin-news-grid-small.jsx';
import AdminCtaHands from '../components/admin-cta-hands.jsx';
import AdminFooter from '../components/admin-footer.jsx';

function HomePage() {
  return (
    <>
      <AdminHeader />
      <AdminHeroSenHong />
      <AdminMemberLogos />
<AdminAboutOrg />
      <AdminDepartmentCards />
      <AdminStatsLotus />
      
      <AdminNewsFeatured />
      <AdminNewsGridSmall />
      <AdminValueCardsOverlap />
      
      <AdminCtaHands />
      <AdminFooter />
    </>
  );
}

export default HomePage;