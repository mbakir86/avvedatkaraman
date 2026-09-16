import PracticeCard from '@/components/PracticeCard';
import {publicContent} from '@/lib/content';
export const metadata={title:'Çalışma Alanları',description:'Av. Vedat Karaman Hukuk Bürosu çalışma alanları.',alternates:{canonical:'/calisma-alanlari'}};
export default async function Page(){const {practiceAreas,settings}=await publicContent();return <><section className="pageHero"><div className="container"><span className="eyebrow">Hukuk & Danışmanlık</span><h1>Çalışma Alanları</h1><p>{settings.practiceIntro}</p></div></section><section className="section"><div className="container practiceGrid">{practiceAreas.map(x=><PracticeCard key={x.slug} item={x}/>)}</div></section></>;}
