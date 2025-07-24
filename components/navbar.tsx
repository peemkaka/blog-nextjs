import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SessionUser = {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

type Session = {
    user?: SessionUser;
};

async function Navbar() {
    const session = await auth() as Session;
    return (
        <header className='bg-white shadow-sm text-white px-5 py-3 font-work-sans'>
            <nav className='flex items-center justify-between'>
                <Link href="/" className='hover:text-pink-500 transition-colors'>
                    <Image src="/logo.png" alt="Logo" width={144} height={30} />
                </Link>
                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create" className='hover:text-primary transition-colors'>Create</Link>
                            <form action={async () => {
                                "use server";
                                redirect('/api/auth/signout')
                            }} className='inline'>
                                <button type='submit' className='hover:text-primary transition-colors'>Sign Out</button>
                            </form>
                            <Link href={`/user/${session?.user?.id}`} className='hover:text-primary transition-colors'>{session?.user?.name}</Link>
                        </>
                    )
                        :
                        <form action={async () => {
                            "use server";
                            redirect('/api/auth/signin/github')
                        }} className='hover:text-gray-300'>
                            <button type='submit' className='bg-white text-green-600 hover:text-primary px-4 py-2 rounded-md'>Sign In</button>
                        </form>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar