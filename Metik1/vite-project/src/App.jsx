import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Render } from '@puckeditor/core'
import '@puckeditor/core/dist/index.css'
import { puckConfig } from './puck/config.jsx'
import { PAGE_DATA, getSavedData } from './pageData.js'

function PageView({ pageKey }) {
  const data = getSavedData(pageKey) || PAGE_DATA[pageKey] || PAGE_DATA.home
  return <Render config={puckConfig} data={data} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<PageView pageKey="home" />} />
      <Route path="/gioi-thieu"   element={<PageView pageKey="gioi-thieu" />} />
      <Route path="/san-pham"     element={<PageView pageKey="san-pham" />} />
      <Route path="/san-pham/:s"  element={<PageView pageKey="chi-tiet" />} />
      <Route path="/tin-tuc"      element={<PageView pageKey="tin-tuc" />} />
      <Route path="/lien-he"      element={<PageView pageKey="lien-he" />} />
    </Routes>
  )
}