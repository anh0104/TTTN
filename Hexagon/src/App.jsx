import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Render } from '@puckeditor/core'
import '@puckeditor/core/dist/index.css'
import { puckConfig } from './puck/config.jsx'
import { makeDefaultData, loadSaved } from './store/pageStore.js'
import Header from './puck/components/Header.jsx'
import Footer from './puck/components/Footer.jsx'
import NewsDetailPage from './puck/components/NewsDetailPage.jsx'

function PageView({ pageKey, lang = 'vi' }) {
  const data = loadSaved(pageKey, lang) || makeDefaultData(pageKey, lang)
  return <Render config={puckConfig} data={data} />
}

// Trang tin tức chi tiết không dùng Puck (nội dung động theo slug)
function NewsDetail({ lang }) {
  return (
    <>
      <Header lang={lang} />
      <NewsDetailPage />
      <Footer lang={lang} />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      {/* VI */}
      <Route path="/"            element={<PageView pageKey="home"     lang="vi" />} />
      <Route path="/tin-tuc"     element={<PageView pageKey="tin-tuc"  lang="vi" />} />
      <Route path="/tin-tuc/:slug" element={<NewsDetail lang="vi" />} />

      {/* EN */}
      <Route path="/en"          element={<PageView pageKey="home"     lang="en" />} />
      <Route path="/en/news"     element={<PageView pageKey="tin-tuc"  lang="en" />} />
      <Route path="/en/news/:slug" element={<NewsDetail lang="en" />} />
    </Routes>
  )
}