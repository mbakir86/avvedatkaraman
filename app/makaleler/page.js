import {publicContent} from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
export const metadata={title:'Makaleler',description:'Av. Vedat Karaman tarafından hazırlanan hukuki bilgilendirme yazıları.',alternates:{canonical:'/makaleler'}};
export default async function Page(){const {articles,settings}=await publicContent();return <><section className="pageHero"><div className="container"><span className="eyebrow">Bilgi & Değerlendirme</span><h1>Makaleler</h1><p>{settings.articleIntro}</p></div></section><section className="section"><div className="container articleGrid">{articles.map(a=><ArticleCard key={a.slug} article={a}/>)}</div></section></>;}
