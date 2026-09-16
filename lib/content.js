import { cache } from 'react';
import { sql } from './db';
import { defaults } from './defaults';
export const getDocument=cache(async()=>{const rows=await sql`SELECT data,revision FROM cms_documents WHERE key='site'`;return rows[0]?{...rows[0],data:{...rows[0].data,settings:{...defaults.settings,...rows[0].data.settings}}}:{data:defaults,revision:0};});
export async function getContent(){const {data}=await getDocument();return data;}
export async function publicContent(){const d=await getContent();return {...d,articles:d.articles.filter(a=>a.published),pages:d.pages.filter(a=>a.published)};}
