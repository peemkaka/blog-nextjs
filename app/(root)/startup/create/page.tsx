import StartupForm from '@/components/startupForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

async function Create() {
    const session = await auth();
    if (!session) {
        redirect('/');
    }
    return (
        <>
            <section className='pink_container'>
                <h1 className='heading'>Submit Your Startup</h1>
            </section>
            <StartupForm />
        </>
    )
}

export default Create