import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/data/site';
export const metadata = {
 metadataBase: new URL(site.url),
 title: { default: `${site.office} | İstanbul`, template: `%s | ${site.office}` },
 description: 'Av. Vedat Karaman Hukuk Bürosu. İstanbul merkezli hukuki danışmanlık ve avukatlık hizmetleri.',
 openGraph: { type:'website', locale:'tr_TR', url:site.url, siteName:site.office, images:[{url:'/images/hero-hukuk.webp', width:1600, height:1108}] },
 twitter: { card:'summary_large_image' },
 alternates: { canonical:'/' },
};
export default function RootLayout({children}){
 const jsonLd={ '@context':'https://schema.org', '@type':'LegalService', name:site.office, url:site.url, telephone:site.phoneHref, email:site.email, address:{'@type':'PostalAddress',streetAddress:site.address,addressLocality:'İstanbul',addressCountry:'TR'} };
 return <html lang="tr"><body><a className="skip" href="#main">İçeriğe geç</a><Header/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></body></html>;
}
