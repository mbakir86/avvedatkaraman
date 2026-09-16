import PageHero from '@/components/PageHero';
import PracticeCard from '@/components/PracticeCard';
import {publicContent} from '@/lib/content';
export const metadata={title:'Çalışma Alanları',description:'Av. Vedat Karaman Hukuk Bürosu çalışma alanları.',alternates:{canonical:'/calisma-alanlari'}};
export default async function Page(){const {practiceAreas,settings}=await publicContent();return <><PageHero image={settings.practiceHeaderImage||'/images/header-practice.webp'} eyebrow="Hukuk & Danışmanlık" title="Çalışma Alanları" description={settings.practiceIntro}/><section className="section"><div className="container practiceGrid">{practiceAreas.map(x=><PracticeCard key={x.slug} item={x}/>)}</div></section></>;}
