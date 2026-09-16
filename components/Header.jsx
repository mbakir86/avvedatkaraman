'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
export default function Header({menus,settings}){const [open,setOpen]=useState(false);const path=usePathname();if(path.startsWith('/admin'))return null;return <header className="siteHeader"><div className="container navWrap"><button className="menuBtn" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Menüyü aç veya kapat"><span/><span/><span/></button><nav className={open?'nav open':'nav'} aria-label="Ana menü">{menus.map((m,i)=><Link href={m.href} onClick={()=>setOpen(false)} key={i} aria-current={path===m.href?'page':undefined}>{m.label}</Link>)}</nav><Link href="/" className="brand wordmark" aria-label="Av. Vedat Karaman ana sayfa"><img src={settings.logo} alt="" width="76" height="76"/><span>Av. Vedat Karaman<small>HUKUK BÜROSU</small></span></Link></div></header>;}
