import React from "react";
import { Routes, Route } from "react-router-dom";
import { Render } from "@puckeditor/core";
import { puckConfig } from "./puck/config";
import "@puckeditor/core/dist/index.css";

import Editor from "./pages/Editor";

const HOME_DATA = {
  content: [
    { type: "Header", props: { id: "h1" } },
    { type: "Hero", props: { id: "hero1" } },
    { type: "MemberLogos", props: { id: "ml1" } },
    { type: "About", props: { id: "ab1" } },
    { type: "Committees", props: { id: "cm1" } },
    { type: "Stats", props: { id: "st1" } },
    { type: "News", props: { id: "nw1" } },
    { type: "Values", props: { id: "vl1" } },
    { type: "Contact", props: { id: "ct1" } },
    { type: "Footer", props: { id: "ft1" } },
  ],
  root: { props: {} },
};

const GIOI_THIEU_DATA = {
  content: [
    { type: "Header", props: { id: "h1" } },
    { type: "AboutPage", props: { id: "ap1" } },
    { type: "Contact", props: { id: "ct1" } },
    { type: "Footer", props: { id: "ft1" } },
  ],
  root: { props: {} },
};

const HOI_VIEN_DATA = {
  content: [
    { type: "Header", props: { id: "h1" } },
    { type: "Member", props: { id: "mv1" } },
    { type: "Contact", props: { id: "ct1" } },
    { type: "Footer", props: { id: "ft1" } },
  ],
  root: { props: {} },
};

const DEFAULTS = {
  home: HOME_DATA,
  "gioi-thieu": GIOI_THIEU_DATA,
  "hoi-vien": HOI_VIEN_DATA,
};

function getPageData(key) {
  try {
    const s = localStorage.getItem("dndt_pages");
    if (s) {
      const all = JSON.parse(s);
      if (all[key]) return all[key];
    }
  } catch {}

  return DEFAULTS[key] || HOME_DATA;
}

function PageView({ pageKey }) {
  const data = getPageData(pageKey);
  return <Render config={puckConfig} data={data} />;
}

export default function App() {
  return (
    <Routes>
      {/* Editor */}
      <Route path="/editor" element={<Editor />} />

      {/* Website */}
      <Route path="/" element={<PageView pageKey="home" />} />
      <Route path="/gioi-thieu" element={<PageView pageKey="gioi-thieu" />} />
      <Route path="/hoi-vien" element={<PageView pageKey="hoi-vien" />} />
    </Routes>
  );
}