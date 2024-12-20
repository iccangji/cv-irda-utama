import Head from 'next/head';
import { Inter } from 'next/font/google';
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});
import { useEffect, useState } from 'react';
import Navbar from '../../components/section/navbar';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProductsTabAdmin from '../../components/section/admin/index/tabs/products';
import CategoriesTabAdmin from '../../components/section/admin/index/tabs/categories';
export default function AdminIndexPage() {
    const router = useRouter();
    const [user, setUser] = useState(false);
    const [tab, setTab] = useState("products");

    const handleLogout = async () => {
        try {
            const verifyResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {}, {});

            if (verifyResponse.status === 200) {
                Cookies.remove('token', { path: '/' });
                if (!Cookies.get('token')) {
                    router.push('/admin/login');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const authVerify = async () => {
        try {
            const token = Cookies.get('token');
            const verifyResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (token && verifyResponse.status === 200) {
                setUser(true);
            } else {
                router.push('/admin/login');
            }
        } catch (error) {
            console.log(error);
            router.push('/admin/login');
        }
    }

    useEffect(() => {
        authVerify();
    }, []);
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>CV Irda Utama</title>
                <link rel='icon' href='/favicon.ico' />
                <meta
                    name='description'
                    content='CV. Irda Utama website'
                />
            </Head>
            <div className={`dark:bg-gray-900 bg-dark-100 p-2 w-full h-screen` + inter.className}>
                <header>
                    <Navbar isAdmin={true} handleLogout={handleLogout} />
                </header>


                <div className="p-4">
                    <div className="border-[1px] border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
                        <div className="flex justify-between items-center w-full border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li>
                                    <div
                                        className={`${tab === "products" ? "text-secondary" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} cursor-pointer inline-block p-4`}
                                        onClick={() => setTab("products")}
                                    >
                                        Produk
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className={`${tab === "categories" ? "text-secondary" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} cursor-pointer inline-block p-4`}
                                        onClick={() => setTab("categories")}
                                    >
                                        Kategori
                                    </div>
                                </li>
                            </ul>
                            <div
                                onClick={handleLogout}
                                className={'block rounded-md pe-4 py-2 text-secondary font-medium cursor-pointer'}>
                                Logout
                            </div>
                        </div>
                        <div className="p-4">
                            {user ? (
                                <div>
                                    {tab === "products" ? (
                                        <ProductsTabAdmin />
                                    ) : (
                                        <CategoriesTabAdmin />
                                    )}
                                </div>
                            ) : (<div className='w-full h-96 flex justify-center items-center'>
                                <ClipLoader size={120} color='#58a840' cssOverride={{ display: 'block' }} />
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
