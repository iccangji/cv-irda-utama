import {
    InformationCircleIcon,
    ArrowLeftIcon
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import priceFormat from '../../../utils/priceFormatter';
const DetailsProduct = ({ product }) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    useState(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        return () => {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);
    return (
        <section className='bg-white dark:bg-gray-800 lg:mt-10 my-10 py-4 rounded-lg mx-4' id="product">
            {/* Feature #1 */}
            <div className="py-4 w-full flex px-6 gap-4 md:gap-8 items-center dark:text-white text-gray-900">
                <button
                    className='hover:text-primary dark:hover:text-primary-800'
                    onClick={goBack}
                >
                    <ArrowLeftIcon width={32} height={32} className='md:w-8 md:h-8 h-6 w-6' />
                </button>
                <div className='font-bold text-lg w-full md:w-auto w-full text-center pe-6'>Detail Produk</div>
            </div>
            <hr className='w-full border-[1px] border-gray-300 dark:border-gray-700 px-16' />
            <div className="relative w-full mx-auto my-8 flex flex-col md:flex-row px-6 md:px-10 gap-8 md:gap-4 items-between">
                <div className="flex w-1/2 justify-center">
                    <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`} alt={product.name} className="md:w-5/6 md:h-5/6 object-cover" width={500} height={500} />
                </div>
                <div className="flex flex-col w-full md:w-1/3 items-start">
                    <div className="text-3xl text-gray-900 dark:text-white font-bold">{product.name}</div>
                    <div className="flex gap-2 items-center mt-4">
                        <div className={`text-sm font-medium py-1 px-2 rounded-md ${product.isReady ? 'bg-green-300 text-green-900' : 'bg-red-300 text-red-900'}`}>{product.isReady ? 'Ready Stok' : 'Stok Habis'}</div>
                        <div className="text-sm font-medium bg-secondary text-gray-900 py-1 px-2 text-white rounded-md dark:text-white flex items-center gap-2">
                            <InformationCircleIcon width={20} height={20} />
                            {product.category}
                        </div>
                    </div>
                    <div className="w-full border-[1px] border-secondary dark:border-secondary-800 my-4 p-4 rounded-md text-secondary font-bold text-lg">Rp. {priceFormat(product.price)}</div>
                    <p className='text-gray-900 dark:text-white font-light'>
                        {product.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DetailsProduct;
