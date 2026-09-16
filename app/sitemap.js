import {publicContent} from '@/lib/content';
export default async function sitemap(){const d=await publicContent(),url=process.env.SITE_URL;return [...['','/calisma-alanlari','/makaleler','/hakkimizda','/iletisim','/gizlilik'].map(p=>({url:url+p,changeFrequency:'weekly',priority:p?0.7:1})),...d.articles.map(a=>({url:`${url}/makaleler/${a.slug}`,changeFrequency:'monthly',priority:0.7})),...d.practiceAreas.map(a=>({url:`${url}/calisma-alanlari/${a.slug}`,priority:0.8})),...d.pages.map(a=>({url:`${url}/sayfa/${a.slug}`,priority:0.6}))];}
export const dynamic='force-dynamic';
