import {isAdmin} from '@/lib/auth';
import {getContent} from '@/lib/content';
import {sql} from '@/lib/db';
import {body,sameOrigin,fail} from '@/lib/security';
import {unsubscribeToken} from '@/lib/subscriptions';
import {queueMail,deliverMail,mailConfig} from '@/lib/mail';
export async function POST(req){if(!await isAdmin()||!sameOrigin(req))return fail('Yetkisiz istek.',403);try{if(!await mailConfig())return fail('Önce e-posta gönderimini yapılandırın.',409);const {slug}=await body(req,1000);const article=(await getContent()).articles.find(a=>a.slug===slug&&a.published);if(!article)return fail('Yayımlanmış makale bulunamadı.',404);const subscribers=await sql`SELECT id,email FROM subscribers WHERE confirmed=true`;let queued=0;for(const s of subscribers){const dedupe=`article:${slug}:${s.id}`;const existing=await sql`SELECT id FROM mail_outbox WHERE dedupe=${dedupe}`;if(existing.length)continue;const token=unsubscribeToken(s.id);await queueMail(s.email,`Yeni makale: ${article.title}`,`${article.title}\n\n${article.excerpt||''}\n\nOkumak için: ${process.env.SITE_URL}/makaleler/${slug}\n\nAbonelikten ayrılmak için: ${process.env.SITE_URL}/abonelik?token=${token}&action=leave`,dedupe,s.id);queued++;}return Response.json({queued,...await deliverMail()});}catch{return fail('Bildirim hazırlanamadı.');}}
