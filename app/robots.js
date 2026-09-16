export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/','/abonelik']},sitemap:`${process.env.SITE_URL}/sitemap.xml`};}
