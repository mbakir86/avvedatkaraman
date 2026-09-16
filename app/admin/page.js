import {redirect} from 'next/navigation';
import {isAdmin} from '@/lib/auth';
import {getDocument} from '@/lib/content';
import Dashboard from '@/components/admin/Dashboard';
export default async function Page(){if(!await isAdmin())redirect('/admin/giris');return <Dashboard initial={await getDocument()}/>;}
