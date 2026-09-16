import {z} from 'zod';
import {sql} from '@/lib/db';
import {sameOrigin,body,rateLimit,clientIP,fail} from '@/lib/security';
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(254),phone:z.string().max(30),message:z.string().trim().min(10).max(5000),consent:z.literal(true),website:z.string().max(0)});
export async function POST(req){if(!sameOrigin(req))return fail('Geçersiz istek.',403);try{if(!await rateLimit('contact:'+clientIP(req)))return fail('Çok fazla istek. Lütfen daha sonra deneyin.',429);const d=schema.parse(await body(req,10000));await sql`INSERT INTO messages(name,email,phone,message) VALUES(${d.name},${d.email},${d.phone},${d.message})`;return Response.json({ok:true});}catch{return fail('Alanları ve gizlilik onayını kontrol edin.');}}
