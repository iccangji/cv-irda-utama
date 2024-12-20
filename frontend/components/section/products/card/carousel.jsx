import Image from 'next/image';
import { useRouter } from 'next/router';
import priceFormat from '../../../../utils/priceFormatter';
const CarouselProductsCard = ({ name, id, category, price, image }) => {
    const router = useRouter();
    return (
        <div
            className='bg-white dark:bg-gray-800 rounded-md shadow-md cursor-pointer border-[1px] border-gray-400 dark:border-white hover:border-primary dark:hover:border-primary-800 ease-in-out duration-150 hover:scale-105 flex-shrink-0 w-52 md:w-40 lg:w-64 h-[19rem] lg:h-[22rem]'
            onClick={() => router.push(`/products/${id}`)}
        >
            <div className='p-6 flex flex-col items-center'>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploads/${image}`} alt={name} width={800} height={500} className='h-[120px] md:h-[160px] w-[120px] md:w-[360px] object-cover' />
            </div>
            <hr className='border-b border-gray-400 dark:border-white' />
            <div className='pt-2 px-8 flex flex-col items-center text-center'>
                <h3 className='mt-2 mb-2 text-primary dark:text-primary-800 text-lg font-bold truncate ... w-full'>
                    {name}
                </h3>
                <h3 className='mb-2 text-gray-900 dark:text-white text-sm md:text-md font-medium text-center'>
                    {category}
                </h3>
                <p className='pb-4 md:pb-8 text-gray-900 dark:text-white font-light'>
                    Rp. {
                        priceFormat(price)
                    }
                </p>
            </div>
        </div>
    );
};

export default CarouselProductsCard;
