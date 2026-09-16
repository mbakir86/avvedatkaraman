import {timingSafeEqual} from 'node:crypto';
import {sql} from '@/lib/db';
import {deliverMail} from '@/lib/mail';
export async function GET(req){const expected=Buffer.from(`Bearer ${process.env.CRON_SECRET||''}`),actual=Buffer.from(req.headers.get('authorization')||'');if(!process.env.CRON_SECRET||expected.length!==actual.length||!timingSafeEqual(expected,actual))return new Response('Unauthorized',{status:401});await sql`UPDATE visits SET ip_encrypted=null WHERE ip_expires_at<=now() AND ip_encrypted IS NOT NULL`;await sql`DELETE FROM rate_limits WHERE expires_at<now()`;await sql`DELETE FROM visits WHERE created_at<now()-interval '2 years'`;return Response.json(await deliverMail());}
