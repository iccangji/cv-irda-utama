import Card from '../../card';
import SectionHeading from '../../section_heading';
import products from '../../../data/products';
import Link from 'next/link';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
const Product = () => {
	const [productsData, setProductsData] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?limit=12`);
			setProductsData(response.data.data);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<section className='bg-white dark:bg-gray-800 lg:mt-10 py-10 rounded-lg mx-4' id="product">
			{/* Heading */}
			<div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
				<SectionHeading text="Produk Kami" />
			</div>
			{/* Feature #1 */}
			{loading ? (
				<div className="relative w-full h-96 flex justify-center items-center">
					<ClipLoader color="var(--secondary-color)" size={120} />
				</div>
			) : productsData.length > 0 ? (
				<div className='md:px-4'>
					<div className="relative w-full mx-auto mt-10 md:mt-20">
						<div className="px-2 md:px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20">
							{productsData.map((item) => (
								<Card
									id={item.id}
									key={item.id}
									name={item.name}
									category={item.category}
									price={item.price}
									image={item.image}
								/>
							))}
						</div>
					</div>
					<div
						className='w-100 flex justify-center mt-10 md:mt-20'>
						<Link
							href={'/products'}
						>
							<button
								className='w-100 bg-primary text-onPrimary p-4 rounded-md hover:bg-primary-800 hover:text-black hover:animate-pulse hover:scale-105 ease-in-out duration-200 shadow-md'>
								Lihat Selengkapnya
							</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="relative w-full h-96 flex justify-center items-center text-gray-900 dark:text-white">
					Terjadi kesalahan. Harap coba lagi
				</div>
			)
			}
		</section>
	);
};

export default Product;
