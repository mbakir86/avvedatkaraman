import PracticeCard from '@/components/PracticeCard';
import { practiceAreas } from '@/data/site';
export const metadata={title:'Çalışma Alanları',description:'Av. Vedat Karaman Hukuk Bürosu çalışma alanları.'};
export default function Page(){return <><section className="pageHero"><div className="container"><span className="eyebrow">Hukuk & Danışmanlık</span><h1>Çalışma Alanları</h1><p>Sunulan hukuki hizmetlerin genel çerçevesini inceleyebilirsiniz. Her dosya, somut olayın özellikleri ve güncel mevzuat çerçevesinde ayrıca değerlendirilir.</p></div></section><section className="section"><div className="container"><div className="practiceGrid">{practiceAreas.map(x=><PracticeCard key={x.slug} item={x}/>)}</div></div></section></>}
