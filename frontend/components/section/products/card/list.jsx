import Image from 'next/image';
import { useRouter } from 'next/router';
import priceFormat from '../../../../utils/priceFormatter';
const CategoryProductsCard = ({ name, id, category, price, image, sizeCard, sizeImg }) => {
    const router = useRouter();
    return (
        <div
            className='flex items-center bg-white dark:bg-gray-800 rounded-md shadow-sm cursor-pointer border-[1px] border-gray-200 dark:border-white hover:border-primary dark:hover:border-primary-800 ease-in-out duration-150 md:hover:scale-105 flex-shrink-0 w-full'
            onClick={() => router.push(`/products/${id}`)}
        >
            <div className={`px-4 py-2 md:py-4 flex flex-col items-center ${sizeCard}`}>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image}`} alt={name} width={300} height={300} className={`object-cover ${sizeImg}`} />
            </div>
            <div className='pt-2 px-8 flex flex-col items-start'>
                <h3 className='mt-1 mb-1 text-primary dark:text-primary-800 text-sm font-bold'>
                    {name}
                </h3>
                <h3 className='mb-1 text-gray-900 dark:text-white text-xs font-medium text-start'>
                    {category}
                </h3>
                <p className='pb-4 text-gray-900 dark:text-white font-light text-xs'>Rp. {priceFormat(price)}</p>
            </div>
        </div>
    );
};

export default CategoryProductsCard;
