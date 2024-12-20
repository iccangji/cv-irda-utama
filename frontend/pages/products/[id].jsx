import Head from 'next/head'
import Footer from '../../components/section/footer'
import Navbar from '../../components/section/navbar'

import { Inter } from 'next/font/google'
import ScrollToTopButton from '../../components/scroll_to_top'
import MessageButton from '../../components/message_button'
import SearchBar from '../../components/section/products/search_bar'
import SearchProducts from '../../components/section/products/search'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})
import { useRouter } from 'next/router';
import DetailsProduct from '../../components/section/products/details'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
export default function ProductByIdPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});

    const fetchData = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`);

            setProduct((response.data.data)[0]);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (router.query.id !== undefined) {
            fetchData(router.query.id);
        }
    }, [router.query.id])
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
                {loading ? (
                    <div className="relative w-full h-96 flex justify-center items-center">
                        <ClipLoader color="var(--secondary-color)" size={120} />
                    </div>
                ) : product !== undefined && Object.keys(product).length !== 0 ? (
                    <DetailsProduct product={product} />
                ) : (
                    <div className="relative w-full h-96 flex justify-center items-center text-gray-900 dark:text-white">
                        Produk tidak ditemukan
                    </div>
                )}
            </div>
            <Footer />
            <ScrollToTopButton />
            <MessageButton />
        </>
    )
}
