import Head from 'next/head';
import LoginForm from '../../components/section/admin/login/form';
import { Inter } from 'next/font/google';
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})
import { useState } from 'react';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';

import axios from 'axios';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError("");

        if (!formData.username || !formData.password) {
            setError("Semua field wajib diisi.");
            setLoading(false)
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, formData);
            if (response.status === 200) {
                const { token } = response.data;
                Cookies.set('token', token, { expires: 1, path: '/' });
                router.push('/admin');
            }
        } catch (err) {
            setError(err.status === 401 ? "Username atau password salah." : "Terjadi kesalahan. Coba lagi nanti.");
            setLoading(false);
        }
    };
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
            <div className={`dark:bg-gray-900 bg-gray-100 w-full h-screen flex w-full` + inter.className}>
                <div className="flex h-full flex-col justify-center px-6 lg:px-8 w-full md:w-1/2">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="mt-10 text-center text-xl font-bold tracking-tight text-primary">CV. Irda Utama</div>
                        <div className="mt-10 text-center text-md font-medium tracking-tight text-gray-900 dark:text-white">Masukkan username dan password</div>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
                        {error && <p className="mb-4 bg-red-200 text-red-900 p-4 rounded-md text-sm">{error}</p>}
                        {loading &&
                            <div className="absolute top-1/2 left-[40%] md:left-[22%]">
                                <ClipLoader size={80} color='#58a840' cssOverride={{ display: 'block' }} />
                            </div>
                        }
                        <LoginForm
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div className="flex h-full flex-col justify-end w-1/2 hidden md:block">
                    <Image
                        src="/img/irda-utama.png"
                        height={600}
                        width={600}
                        className='w-full object-cover h-full'
                        alt='IRDA UTAMA'
                    />
                </div>
            </div>
        </>
    )
}
