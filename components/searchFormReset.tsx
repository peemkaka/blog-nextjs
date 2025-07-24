'use client'
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

function SearchFormReset() {
    const router = useRouter();
    
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement
        const input = form?.querySelector('input[name="query"]') as HTMLInputElement
        
        if (input) {
            input.value = ''; 
        }
        
        router.push('/');
    }
    
    return (
        <button
            type="button"
            onClick={reset}
            className='search-btn text-white text-xl'
        >
            <X/>
        </button>
    )
}

export default SearchFormReset