import {auth} from '@/lib/auth';
import {sameOrigin,fail} from '@/lib/security';
const handler=auth.handler();
const allowed=new Set(['sign-in/email','sign-out','get-session','request-password-reset','reset-password','change-password','list-sessions','revoke-session','revoke-sessions','revoke-other-sessions','verify-email']);
async function handle(req,ctx){const {path}=await ctx.params;if(!allowed.has(path.join('/')))return fail('Bu işlem kullanılamıyor.',404);if(req.method==='POST'&&!sameOrigin(req))return fail('İstek kaynağı geçersiz.',403);return handler[req.method](req,ctx);}
export const GET=handle;
export const POST=handle;
