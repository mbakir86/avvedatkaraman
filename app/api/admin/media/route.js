import {PutObjectCommand,HeadObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {randomUUID} from 'node:crypto';
import {isAdmin} from '@/lib/auth';
import {storage,bucket} from '@/lib/storage';
import {sql} from '@/lib/db';
import {sameOrigin,body,fail} from '@/lib/security';
const formats={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','video/mp4':'mp4','video/webm':'webm'};
export async function GET(){if(!await isAdmin())return fail('Oturum gerekli.',401);return Response.json(await sql`SELECT * FROM media ORDER BY created_at DESC LIMIT 500`,{headers:{'Cache-Control':'no-store'}});}
export async function POST(req){if(!await isAdmin()||!sameOrigin(req))return fail('Yetkisiz istek.',403);try{const d=await body(req,2000);if(d.action==='sign'){if(!formats[d.type]||!Number.isInteger(d.size)||d.size<1||d.size>100*1024*1024)return fail('JPG, PNG, WebP, MP4 veya WebM kullanın. En fazla 100 MB.');const key=`uploads/${randomUUID()}.${formats[d.type]}`;const url=`${process.env.AWS_ENDPOINT_URL_S3}/${bucket}/${key}`;const upload=await getSignedUrl(storage,new PutObjectCommand({Bucket:bucket,Key:key,ContentType:d.type,ContentLength:d.size,CacheControl:'public,max-age=31536000,immutable'}),{expiresIn:300});return Response.json({key,url,upload});}if(d.action==='complete'){if(!/^uploads\/[a-f0-9-]{36}\.(jpg|png|webp|mp4|webm)$/.test(d.key))return fail('Geçersiz dosya.');const head=await storage.send(new HeadObjectCommand({Bucket:bucket,Key:d.key}));if(!formats[head.ContentType]||head.ContentLength>100*1024*1024)return fail('Dosya doğrulanamadı.');const url=`${process.env.AWS_ENDPOINT_URL_S3}/${bucket}/${d.key}`;await sql`INSERT INTO media(key,url,type,size) VALUES(${d.key},${url},${head.ContentType},${head.ContentLength}) ON CONFLICT(key) DO NOTHING`;return Response.json({url});}return fail('Geçersiz işlem.');}catch{return fail('Medya işlemi tamamlanamadı.');}}
