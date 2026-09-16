import PageHero from '@/components/PageHero';
import {publicContent} from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
export const metadata={title:'Makaleler',description:'Av. Vedat Karaman tarafından hazırlanan hukuki bilgilendirme yazıları.',alternates:{canonical:'/makaleler'}};
export default async function Page(){const {articles,settings}=await publicContent();return <><PageHero image={settings.articlesHeaderImage||'/images/header-articles.webp'} eyebrow="Bilgi & Değerlendirme" title="Makaleler" description={settings.articleIntro}/><section className="section"><div className="container articleGrid">{articles.map(a=><ArticleCard key={a.slug} article={a}/>)}</div></section></>;}
