import SectionHeading from '../../section_heading';
import CategoryProductsCard from './card/list';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import ProductCategoryTable from './table/category';

const CategoryProducts = () => {
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);

    const [error, setError] = useState(false);

    const [categoriesData, setCategoriesData] = useState([]);
    const [productsData, setProductsData] = useState([]);

    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [currentItemsPerPage, setCurrentItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const changeCategory = (category) => {
        setCategory(category);
        setCurrentPage(1);
        fetchProductsData(1, currentItemsPerPage, category);
    };

    const fetchCategoriesData = async () => {
        setCategoriesLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
            setCategoriesData(response.data.data);
        } catch (err) {
            console.log(err);
        }
        setCategoriesLoading(false);
    };

    const fetchProductsData = async (
        page = currentPage,
        limit = currentItemsPerPage,
        selectedCategory = category
    ) => {
        setProductsLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category-products?page=${page}&limit=${limit}&category=${selectedCategory}`);
            setProductsData(response.data.data);
            setCurrentPage(response.data.page);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
            setError(false);
        } catch (err) {
            console.log(err);
            setError(true);
        }
        setProductsLoading(false);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            fetchProductsData(currentPage - 1, currentItemsPerPage, category);
        };
    };


    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            fetchProductsData(currentPage + 1, currentItemsPerPage, category);
        };
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        fetchProductsData(page, currentItemsPerPage, category);
    };

    useEffect(() => {
        fetchCategoriesData();
        fetchProductsData();
    }, [])

    return (
        <div className='bg-white dark:bg-gray-800 my-10 pt-20 pb-4 rounded-lg mx-6' id='category' >
            <div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
                <SectionHeading text="Katalog" />
            </div>
            {error ? (
                <div className="relative w-full h-96 flex justify-center items-center">
                    <div className='text-gray-600 dark:text-gray-400'>Terjadi kesalahan. Harap coba lagi</div>
                </div>
            ) : (
                <div
                    className="flex flex-col md:flex-row w-full mx-auto mt-4 md:mt-10 px-6 justify-between items-start gap-4"
                >
                    <div
                        className="flex flex-col w-full md:w-1/3 text-gray-900 dark:text-white md:border-e-[1px] border-gray-300 dark:border-white px-4"
                    >
                        {categoriesLoading ? (
                            <div className="relative w-full h-96 flex justify-center items-center">
                                <ClipLoader color="var(--secondary-color)" size={120} />
                            </div>
                        ) : (
                            <ul className='hidden md:block'>
                                <li
                                    className={`mb-4 cursor-pointer text-gray-900 dark:text-white hover:text-primary hover:text-primary-900 font-medium hover:scale-105 ease-in-out duration-200 p-3 me-8 rounded-md ${category === '' ? 'text-primary bg-gray-200 dark:bg-gray-700' : ''}`}
                                    onClick={() => changeCategory('')}
                                >
                                    Semua Kategori
                                </li>
                                {categoriesData.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`mb-4 cursor-pointer text-gray-900 dark:text-white hover:text-primary hover:text-primary-900 font-medium hover:scale-105 ease-in-out duration-200 p-3 me-8 rounded-md ${category === item.id ? 'text-primary bg-gray-200 dark:bg-gray-700' : ''}`}
                                        onClick={() => changeCategory(item.id)}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <select
                            onChange={(e) => changeCategory(e.target.value)}
                            className='block md:hidden w-full mt-4 p-2 bg-white dark:bg-gray-700 rounded-md text-gray-900 dark:text-white'
                            value={category}
                        >
                            <option
                                className={`mb-4 cursor-pointer text-gray-900 dark:text-white hover:text-primary hover:text-primary-900 font-medium hover:scale-105 ease-in-out duration-200 p-3 me-8 rounded-md text-xs`}
                                value={''}
                            >
                                Semua Kategori
                            </option>
                            {categoriesData.map((item, index) => (
                                <option
                                    key={index}
                                    className={`mb-4 cursor-pointer text-gray-900 dark:text-white hover:text-primary hover:text-primary-900 font-medium hover:scale-105 ease-in-out duration-200 p-3 me-8 rounded-md text-xs`}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {productsLoading ? (
                        <div className="relative w-full h-[30rem] flex justify-center items-center">
                            <ClipLoader color="var(--secondary-color)" size={120} />
                        </div>
                    ) : (<ProductCategoryTable
                        data={productsData}
                        category={category}
                        onNextPage={goToNextPage}
                        onPreviousPage={goToPreviousPage}
                        currentPage={currentPage}
                        itemsPerPage={10}
                        totalPages={totalPages}
                        goToPage={goToPage}
                        totalItems={totalItems}
                    />
                    )}
                </div>
            )}

        </div>
    );
};

export default CategoryProducts;
