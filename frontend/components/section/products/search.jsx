import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import SearchProductsCard from './card/list';
const SearchProducts = ({ data, onNextPage, onPreviousPage, currentPage, itemsPerPage, totalPages, goToPage, totalItems }) => {
    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else if (currentPage <= 3) {
        pages.push(1, 2, 3, totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, totalPages - 2, totalPages - 1, totalPages);
    } else {
        pages.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages);
    };

    return (
        <div className='bg-white dark:bg-gray-800 my-10 py-2 md:py-10 rounded-lg mx-6' >
            {data.length > 0 ? (
                <div
                    className="flex flex-col md:flex-row w-full mx-auto justify-between items-start gap-4"
                >
                    <div className="flex flex-col md:w-2/3 grow text-gray-900 dark:text-white gap-8 w-full overflow-y-auto overflow-x-hidden px-8 md:px-16 pt-6">
                        {data.map((item, index) => (
                            <SearchProductsCard
                                key={index}
                                name={item.name}
                                id={item.id}
                                category={item.category}
                                price={item.price}
                                image={item.image}
                                sizeCard="w-1/3 md:w-1/6 h-16 md:h-32"
                                sizeImg="h-24 w-24"
                            />
                        ))}
                        <nav className="flex items-center justify-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{`${((currentPage - 1) * itemsPerPage) + 1}-${currentPage * itemsPerPage}`}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span></span>
                            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                <li>
                                    <a href="#" onClick={onPreviousPage} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
                                    </a>
                                </li>
                                {
                                    totalPages < 5 ?
                                        pages.map((page) => (
                                            <li key={page}>
                                                <a
                                                    href="#"
                                                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 ${currentPage === page ? 'bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                                    onClick={() => goToPage(page)}
                                                >
                                                    {page}
                                                </a>
                                            </li>
                                        )) : (
                                            pages.map((page) => (
                                                <li key={page}>
                                                    <a
                                                        href="#"
                                                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 ${currentPage === page ? 'bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                                        onClick={() => goToPage(page)}
                                                    >
                                                        {page}
                                                    </a>
                                                </li>
                                            ))
                                        )}
                                <li>
                                    <a href="#" onClick={onNextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            ) : (
                <div className="relative w-full h-96 flex justify-center items-center">
                    <div className='text-gray-600 dark:text-gray-400'>Produk tidak ditemukan</div>
                </div>
            )}
        </div>
    );
};

export default SearchProducts;
