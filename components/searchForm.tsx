import React from 'react'
import Form from 'next/form';
import SearchFormReset from './searchFormReset';
import { Search } from 'lucide-react';

function SearchForm({query}: {query?: string}) {
    return (
        <Form action="/" scroll={false} className="search-form flex items-center justify-center">
            <input
                type="text"
                name="query"
                defaultValue={query}
                placeholder="Search for startups, ideas, or entrepreneurs..."
                className="search-input"
            />
            <div className='flex '>

            </div>
            {query && (
                <SearchFormReset />
            )}
            <button type='submit' className='search-btn text-white'>
                <Search />
            </button>
        </Form>
    )
}

export default SearchForm   