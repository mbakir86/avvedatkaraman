import {createNeonAuth} from '@neondatabase/auth/next/server';
export const auth=createNeonAuth({baseUrl:process.env.NEON_AUTH_BASE_URL,cookies:{secret:process.env.NEON_AUTH_COOKIE_SECRET},logLevel:'warn'});
export async function isAdmin(){try{const {data}=await auth.getSession();return !!data?.user?.id && data.user.id===process.env.ADMIN_USER_ID;}catch{return false;}}
