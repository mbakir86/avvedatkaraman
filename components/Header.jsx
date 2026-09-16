'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
export default function Header(){
 const [open,setOpen]=useState(false);
 const close=()=>setOpen(false);
 return <header className="siteHeader"><div className="container navWrap">
  <Link href="/" className="brand" aria-label="Av. Vedat Karaman ana sayfa" onClick={close}>
   <span className="logoPlate"><Image src="/images/logo.webp" alt="Av. Vedat Karaman" width={250} height={78} priority /></span>
  </Link>
  <button className="menuBtn" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Menüyü aç veya kapat"><span/><span/><span/></button>
  <nav className={open?'nav open':'nav'} aria-label="Ana menü">
   <Link href="/" onClick={close}>Ana Sayfa</Link>
   <Link href="/calisma-alanlari" onClick={close}>Çalışma Alanları</Link>
   <Link href="/#makaleler" onClick={close}>Makaleler</Link>
   <Link href="/hakkimizda" onClick={close}>Hakkımızda</Link>
   <Link href="/iletisim" className="navCta" onClick={close}>İletişim</Link>
  </nav>
 </div></header>
}
