import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {sql} from './lib/db.js';
import {unsubscribeToken} from './lib/subscriptions.js';
const base='http://127.0.0.1:3000';
const request=(path,data,origin=base)=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(data)});
for(const path of ['content','inbox','analytics','media']){const r=await fetch(base+'/api/admin/'+path);assert.equal(r.status,401,path);}
assert.equal((await request('/api/admin/content',{})).status,405);
assert.equal((await fetch(base+'/api/admin/content',{method:'PUT',headers:{Origin:base,'Content-Type':'application/json'},body:'{}'})).status,403);
assert.equal((await request('/api/auth/sign-up/email',{})).status,404);
assert.equal((await request('/api/contact',{},'https://evil.invalid')).status,403);
assert.equal((await fetch(base+'/api/cron')).status,401);
assert.equal((await request('/api/analytics',{consent:false})).status,400);
console.log('PASS 9 unauthorized/origin/consent checks');
const email='integration-'+randomUUID()+'@example.invalid';
let subscriber,visit;
try{
const contact=await request('/api/contact',{name:'Otomatik doğrulama',email,phone:'',message:'Bu kayıt yalnızca bağlantı doğrulama testidir.',consent:true,website:''});assert.equal(contact.status,200);assert.equal((await sql`SELECT id FROM messages WHERE email=${email}`).length,1);console.log('PASS contact persistence');
const s=await sql`INSERT INTO subscribers(email,confirmed,token_hash) VALUES(${email},true,${randomUUID()}) RETURNING id`;subscriber=s[0].id;
await sql`INSERT INTO mail_outbox(recipient,subject,body,dedupe,subscriber_id,kind) VALUES(${email},'Test','Test',${email},${subscriber},'newsletter')`;
const leave=await request('/api/subscription',{action:'leave',token:unsubscribeToken(subscriber)});assert.equal(leave.status,200);assert.equal((await sql`SELECT id FROM subscribers WHERE id=${subscriber}`).length,0);assert.equal((await sql`SELECT status FROM mail_outbox WHERE recipient=${email}`)[0].status,'cancelled');console.log('PASS unsubscribe cancels queued newsletter');
const start=await request('/api/analytics',{action:'start',consent:true,path:'/makaleler'});assert.equal(start.status,200);visit=(await start.json()).id;assert.ok(visit);const cookie=start.headers.get('set-cookie').split(';')[0];await sql`UPDATE visits SET last_seen=now()-interval '30 seconds' WHERE id=${visit}`;
await request('/api/analytics',{action:'heartbeat',consent:true,id:visit,seconds:20});assert.equal((await sql`SELECT active_seconds FROM visits WHERE id=${visit}`)[0].active_seconds,0);
await fetch(base+'/api/analytics',{method:'POST',headers:{Origin:base,Cookie:cookie,'Content-Type':'application/json'},body:JSON.stringify({action:'heartbeat',consent:true,id:visit,seconds:20})});assert.equal((await sql`SELECT active_seconds FROM visits WHERE id=${visit}`)[0].active_seconds,20);console.log('PASS analytics visitor ownership and active time');
}finally{await sql`DELETE FROM messages WHERE email=${email}`;await sql`DELETE FROM mail_outbox WHERE recipient=${email}`;await sql`DELETE FROM subscribers WHERE email=${email}`;if(visit)await sql`DELETE FROM visits WHERE id=${visit}`;}
console.log('All integration fixtures removed; no emails sent.');
