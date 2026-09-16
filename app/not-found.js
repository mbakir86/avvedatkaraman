import Link from 'next/link';
export default function NotFound(){return <section className="pageHero notFound"><div className="container"><span className="eyebrow">404</span><h1>Sayfa bulunamadı</h1><p>Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p><Link href="/" className="btn gold">Ana sayfaya dön</Link></div></section>}
