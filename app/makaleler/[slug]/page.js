import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/data/site';
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}){const {slug}=await params; const a=articles.find(x=>x.slug===slug); if(!a)return {}; return {title:a.title,description:a.excerpt,alternates:{canonical:`/makaleler/${slug}`},openGraph:{images:[a.image]}}}
export default async function Page({params}){const {slug}=await params; const a=articles.find(x=>x.slug===slug); if(!a)notFound(); return <><section className="articleHero"><div className="articleHeroBg"><Image src={a.image} alt="" fill priority sizes="100vw"/></div><div className="heroShade"/><div className="container"><span className="eyebrow">Hukuki Makale · {a.date}</span><h1>{a.title}</h1></div></section><article className="articlePage container"><div className="articleContent">{a.body.map((p,i)=><p key={i}>{p}</p>)}<div className="notice"><strong>Bilgilendirme notu</strong><span>Bu yazı genel bilgilendirme amacıyla yayımlanmıştır. Mevzuat ve içtihatlar değişebilir; somut hukuki durum için güncel değerlendirme yapılmalıdır.</span></div><p className="author">Av. Vedat Karaman · İstanbul · {a.date}</p><Link href="/#makaleler" className="textLink">← Tüm makalelere dön</Link></div></article></>}
