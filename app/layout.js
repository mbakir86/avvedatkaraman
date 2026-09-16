import './globals.css';
import {headers} from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PublicTools from '@/components/PublicTools';
import {getContent} from '@/lib/content';
export const dynamic='force-dynamic';
export async function generateMetadata(){const {settings:s}=await getContent();return {metadataBase:new URL(process.env.SITE_URL),title:{default:`${s.office} | İstanbul`,template:`%s | ${s.office}`},description:s.description,openGraph:{type:'website',locale:'tr_TR',siteName:s.office,images:[{url:'/images/hero-office.webp',width:1536,height:1024}]},twitter:{card:'summary_large_image'}};}
export default async function RootLayout({children}){const nonce=(await headers()).get("x-nonce");const {settings,menus}=await getContent();const jsonLd={'@context':'https://schema.org','@type':'LegalService',name:settings.office,url:process.env.SITE_URL,telephone:settings.phoneHref,email:settings.email,address:{'@type':'PostalAddress',streetAddress:settings.address,addressLocality:'İstanbul',addressCountry:'TR'}};return <html lang="tr"><body><a className="skip" href="#main">İçeriğe geç</a><Header settings={settings} menus={menus}/><main id="main">{children}</main><Footer settings={settings} menus={menus}/><PublicTools whatsapp={settings.whatsapp}/><script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/></body></html>;}
