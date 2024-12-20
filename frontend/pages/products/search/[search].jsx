import Head from 'next/head'
import Footer from '../../../components/section/footer'
import Navbar from '../../../components/section/navbar'

import { Inter } from 'next/font/google'
import ScrollToTopButton from '../../../components/scroll_to_top'
import MessageButton from '../../../components/message_button'
import SearchBar from '../../../components/section/products/search_bar'
import SearchProducts from '../../../components/section/products/search'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
export default function SearchPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [currentItemsPerPage, setCurrentItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async (
        page = currentPage,
        limit = currentItemsPerPage,
        search = query
    ) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?page=${page}&limit=${limit}&search=${search}`);
            setSearchResult(response.data.data);
            setCurrentPage(response.data.page);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
            setError(false);
        } catch (err) {
            console.log(err);
            setError(true);
        }
        setLoading(false);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            fetchData(currentPage - 1, currentItemsPerPage, searchQuery);
        };
    };


    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            fetchData(currentPage + 1, currentItemsPerPage, searchQuery);
        };
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        fetchData(page, currentItemsPerPage, searchQuery);
    };

    useEffect(() => {
        if (router.query.search !== undefined) {
            setSearchQuery(router.query.search);
            fetchData(currentPage, currentItemsPerPage, router.query.search);
        }

    }, [router.query.search])
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>CV Irda Utama - Produk</title>
                <link rel='icon' href='/favicon.ico' />
                <meta
                    name='description'
                    content='CV. Irda Utama website'
                />
            </Head>
            <div className={`dark:bg-gray-900 bg-gray-200 p-2 w-full` + inter.className}>
                {/* Header */}
                <header>
                    <Navbar />
                </header>
                {/* Main Section */}
                <SearchBar value={searchQuery} />
                {loading ? (
                    <div className='flex justify-center items-center h-96'>
                        <ClipLoader color='#ff9247' size={120} />
                    </div>
                ) : error ? (
                    <div className='flex justify-center items-center h-96'>
                        <p className='text-gray-400 dark:text-gray-600'>Terjadi kesalahan saat memuat data</p>
                    </div>
                ) : (
                    <SearchProducts
                        data={searchResult}
                        currentPage={currentPage}
                        onNextPage={goToNextPage}
                        onPreviousPage={goToPreviousPage}
                        itemsPerPage={currentItemsPerPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        goToPage={goToPage}
                    />
                )}
            </div>
            <Footer />
            <ScrollToTopButton />
            <MessageButton />
        </>
    )
}
