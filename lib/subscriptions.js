import {timingSafeEqual} from 'node:crypto';
import {digest} from './security.js';
export function unsubscribeToken(id){return `${id}.${digest('unsubscribe:'+id)}`;}
export function verifyUnsubscribe(token){if(typeof token!=='string'||! /^[a-f0-9-]{36}\.[a-f0-9]{64}$/.test(token))return null;const [id,signature]=token.split('.');if(!/^[a-f0-9-]{36}$/.test(id||'')||! /^[a-f0-9]{64}$/.test(signature||''))return null;const expected=digest('unsubscribe:'+id);return timingSafeEqual(Buffer.from(expected),Buffer.from(signature))?id:null;}
