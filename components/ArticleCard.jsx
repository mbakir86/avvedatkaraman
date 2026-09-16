import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
export default function ArticleCard({article}){return <article className="articleCard"><div className="articleImage"><Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw"/></div><div className="articleBody"><span className="eyebrow">Hukuki Makale · {article.date}</span><h3>{article.title}</h3><p>{article.excerpt}</p><Link href={`/makaleler/${article.slug}`} className="textLink">Makaleyi Oku <Icon name="arrow" size={18}/></Link></div></article>}
