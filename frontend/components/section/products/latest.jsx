import CarouselProducts from './carousel';
import SectionHeading from '../../section_heading';

import products from '../../../data/products';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
const LatestProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [productsData, setProductsData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?limit=10`);
            setProductsData(response.data.data);
            setError(false);
        } catch (err) {
            console.log(err);
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <section className='py-20 rounded-lg mx-4' >
            {/* Heading */}
            <div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
                <SectionHeading text="Produk Terbaru" />
            </div>
            {/* Feature #1 */}
            {loading ? (
                <div className="relative w-full h-96 flex justify-center items-center">
                    <ClipLoader color="var(--secondary-color)" size={120} />
                </div>
            ) : error ? (
                <div className="relative w-full h-96 flex justify-center items-center text-gray-900 dark:text-white">
                    Terjadi kesalahan. Harap coba lagi
                </div>
            ) : (
                <CarouselProducts data={productsData} />
            )
            }
        </section>
    );
};

export default LatestProducts;
