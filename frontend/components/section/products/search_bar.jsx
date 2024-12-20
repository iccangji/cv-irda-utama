import React, { useState, useEffect } from 'react';
import {
    SearchIcon,
    XIcon
} from '@heroicons/react/outline';

import { useRouter } from 'next/router';



const SearchBar = ({ value }) => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const submitSearch = () => {
        if (searchText) {
            router.push(`/products/search/${searchText}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitSearch();
        }
    };

    const clearSearch = () => {
        setSearchText('');
    };
    useEffect(() => {
        if (value) {
            setSearchText(value);
        }
    }, [value]);
    return (
        <section className='pt-4 rounded-lg mx-4' >
            {/* Heading */}
            <div className='flex flex-col'>
                <div className="flex w-full grow gap-2 items-center h-16">
                    <input
                        type="text"
                        name="search"
                        id=""
                        value={searchText}
                        onChange={handleSearchChange}
                        className='w-full rounded-lg p-4 pe-10 border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-primary text-md focus:text-lg dark:focus:border-primary-800 dark:text-white h-full'
                        placeholder='Cari Produk...'
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="text-white dark:text-gray-800 bg-primary dark:bg-primary-800 hover:animate-pulse w-16 p-2 flex justify-center items-center rounded-lg h-full"
                        onClick={submitSearch}
                    >
                        <SearchIcon width={20} height={20} />
                    </button>
                </div>

                {searchText && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-[106px] top-[138px] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <XIcon size={20} height={20} className='text-primary dark:text-primary-800' />
                    </button>
                )}
                <hr
                    className='w-full border-[1px] border-gray-300 dark:border-gray-800 mt-8'
                />
            </div>
        </section>
    );
};

export default SearchBar;
