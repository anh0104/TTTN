import React from 'react'
export default function ContactPage({ mapSrc }={}) {
  const src=mapSrc||'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610737765054!2d106.5310!3d10.9350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ8O0bmcgdHkgQ-G7lSBQaOG6p24gT0NIQU8!5e0!3m2!1svi!2svn'
  return <section style={{ width:'100%' }}><div style={{ width:'100%',height:520 }}><iframe src={src} width="100%" height="100%" style={{ border:'none',display:'block' }} allowFullScreen loading="lazy" title="Map"/></div></section>
}