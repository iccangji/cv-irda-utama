import { useRouter } from 'next/router';
import Image from 'next/image';
import priceFormat from '../utils/priceFormatter';
const Card = ({ name, id, price, category, image }) => {
	const router = useRouter();
	return (
		<div
			className='rounded-md shadow-lg cursor-pointer border-[1px] hover:border-primary ease-in-out duration-150 hover:scale-105'
			onClick={() => router.push(`/products/${id}`)}
		>
			<div className='p-6 flex flex-col items-center'>
				<Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image}`} alt={name} width={500} height={500} className='h-[80px] md:h-[140px] w-[120px] md:w-[360px] object-cover' />
			</div>
			<hr className='border-b border-template-white' />
			<div className='py-2 px-2 md:px-8 flex flex-col items-center justify-center text-center'>
				<h3 className='mt-2 text-primary dark:text-primary-800 text-md md:text-lg font-bold truncate ... w-full'>
					{name}
				</h3>
				<h3 className='mb-2 text-gray-900 dark:text-white text-sm md:text-md font-medium text-center'>
					{category}
				</h3>
				<p className='mb-2 text-gray-900 dark:text-white font-light text-sm md:text-md'>
					Rp. {
						priceFormat(price)
					}
				</p>
			</div>
		</div>
	);
};

export default Card;
