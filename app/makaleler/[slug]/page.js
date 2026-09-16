import {notFound} from 'next/navigation';
import {publicContent} from '@/lib/content';
import ContentPage from '@/components/ContentPage';
async function item(params){const {slug}=await params;return (await publicContent()).articles.find(x=>x.slug===slug);}
export async function generateMetadata({params}){const a=await item(params);return a?{title:a.seoTitle||a.title,description:a.seoDescription||a.excerpt,alternates:{canonical:`/makaleler/${a.slug}`},openGraph:{type:'article',title:a.title,description:a.excerpt,images:[a.image]}}:{};}
export default async function Page({params}){const a=await item(params);if(!a)notFound();return <ContentPage item={a} kind="Makale"/>;}
