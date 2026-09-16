import Link from 'next/link';
import Icon from './Icon';
import { site } from '@/data/site';
export default function Footer(){return <footer className="footer"><div className="container footerGrid">
 <div><div className="footerMark">VK</div><h3>{site.office}</h3><p>Hukuki konularda bilgilendirme, danışmanlık ve temsil hizmetleri.</p></div>
 <div><h4>Bağlantılar</h4><Link href="/calisma-alanlari">Çalışma Alanları</Link><Link href="/#makaleler">Makaleler</Link><Link href="/hakkimizda">Hakkımızda</Link><Link href="/iletisim">İletişim</Link></div>
 <div><h4>İletişim</h4><a href={`tel:${site.phoneHref}`}><Icon name="phone" size={18}/>{site.phoneDisplay}</a><a href={`mailto:${site.email}`}><Icon name="mail" size={18}/>{site.email}</a><p className="address"><Icon name="pin" size={18}/>{site.address}</p></div>
 </div><div className="container footerBottom"><span>© {new Date().getFullYear()} {site.office}. Her hakkı saklıdır.</span><span>Bu sitedeki içerikler genel bilgilendirme amaçlıdır.</span></div></footer>}
