import {isAdmin} from '@/lib/auth';
import {getDocument} from '@/lib/content';
import {sql} from '@/lib/db';
import {body,sameOrigin,fail} from '@/lib/security';
import {documentSchema} from '@/lib/validation';
export async function GET(){if(!await isAdmin())return fail('Oturum gerekli.',401);return Response.json(await getDocument(),{headers:{'Cache-Control':'no-store'}});}
export async function PUT(req){if(!await isAdmin()||!sameOrigin(req))return fail('Yetkisiz istek.',403);try{const input=await body(req);const data=documentSchema.parse(input.data);const revision=Number(input.revision);let rows;if(revision===0)rows=await sql`INSERT INTO cms_documents(key,data) VALUES('site',${JSON.stringify(data)}::jsonb) ON CONFLICT DO NOTHING RETURNING revision`;else rows=await sql`UPDATE cms_documents SET data=${JSON.stringify(data)}::jsonb,revision=revision+1,updated_at=now() WHERE key='site' AND revision=${revision} RETURNING revision`;if(!rows.length)return fail('İçerik başka bir oturumda değişti. Sayfayı yenileyin.',409);await sql`INSERT INTO audit_log(action) VALUES('İçerik güncellendi')`;return Response.json({revision:rows[0].revision});}catch(e){return fail(e.issues?.[0]?.message||'İçerik kaydedilemedi.');}}
