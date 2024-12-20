
import Image from "next/image";
import priceFormat from "../../../../../utils/priceFormatter";
const ProductsTable = ({ data, handleOpenEditModal, handleOpenDeleteModal, onNextPage, onPreviousPage, currentPage, itemsPerPage, totalPages, goToPage, totalItems }) => {
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
        <div className="relative overflow-x-auto rounded-lg border-[1px] border-gray-300 dark:border-gray-700 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        {/* <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="sr-only">checkbox</label>
                            </div>
                        </th> */}
                        <th scope="col" className="px-6 py-3">

                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Harga
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Kategori
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ready
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={item.id}
                        >
                            {/* <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className="sr-only">checkbox</label>
                                </div>
                            </td> */}
                            <td className="p-4 w-32 h-20">
                                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${item.image}`} alt={item.name} width={300} height={300} className={`object-cover w-32 h-32 md:w-24 md:h-24`} />
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                Rp. {priceFormat(item.price)}
                            </td>
                            <td className="px-6 py-4">
                                {item.category}
                            </td>
                            <td className="px-6 py-4">
                                {item.isReady ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Ready
                                    </span>
                                ) : (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Habis
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-8 flex flex-col gap-2 w-full h-full items-start">
                                <button
                                    className="font-medium text-primary dark:text-primary-800 hover:underline hover:text-purple-500"
                                    onClick={() => {
                                        handleOpenEditModal(item);
                                    }}
                                >Edit</button>
                                <button
                                    className="font-medium text-red-500 hover:underline"
                                    onClick={() => {
                                        handleOpenDeleteModal(item);
                                    }}
                                >Hapus</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-10 pb-8" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{`${((currentPage - 1) * itemsPerPage) + 1}-${currentPage * itemsPerPage}`}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#category" onClick={onPreviousPage} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    {
                        totalPages < 5 ?
                            pages.map((page) => (
                                <li key={page}>
                                    <a
                                        href="#"
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
                                            href="#"
                                            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 ${currentPage === page ? 'bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </a>
                                    </li>
                                ))
                            )}
                    <li>
                        <a href="#" onClick={onNextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div >
    );
}

export default ProductsTable;