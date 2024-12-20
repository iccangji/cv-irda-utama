
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import CategoryProductsCard from "../card/list";
const ProductCategoryTable = ({
    data,
    onNextPage,
    onPreviousPage,
    currentPage,
    itemsPerPage,
    totalPages,
    goToPage,
    totalItems
}) => {

    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else if (currentPage <= 3) {
        pages.push(1, 2, 3, totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, totalPages - 2, totalPages - 1, totalPages);
    } else {
        pages.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages);
    };

    return (
        <div className="flex flex-col md:w-2/3 grow text-gray-900 dark:text-white md:ps-10 gap-4 w-full h-[30rem] overflow-y-auto overflow-x-hidden py-4 md:px-8">
            {data.map((item, index) => (
                <CategoryProductsCard
                    key={index}
                    name={item.name}
                    id={item.id}
                    category={item.category}
                    price={item.price}
                    image={item.image}
                    sizeCard={`w-1/3 md:w-1/4 h-16 md:h-32`}
                    sizeImg={`w-24 h-12 md:w-24 md:h-24`}
                />
            ))}
            <nav className="flex justify-center md:justify-end mt-4">
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#category" onClick={onPreviousPage} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <ChevronLeftIcon className="w-4 h-4" />
                        </a>
                    </li>
                    {
                        totalPages < 5 ?
                            pages.map((page) => (
                                <li key={page}>
                                    <a
                                        href="#category"
                                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 ${currentPage === page ? 'bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </a>
                                </li>
                            )) : (
                                pages.map((page) => (
                                    <li key={page}>
                                        <a
                                            href="#category"
                                            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 ${currentPage === page ? 'bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </a>
                                    </li>
                                ))
                            )}
                    <li>
                        <a href="#category" onClick={onNextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <ChevronRightIcon className="w-4 h-4" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProductCategoryTable;