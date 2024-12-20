import { useEffect, useState } from "react";
import {
    PlusIcon,
    SearchIcon,
    XIcon
} from '@heroicons/react/outline';
import ProductsTable from '../table/products';
import EditProductModal from '../modal/products/edit';
import DeleteProductModal from '../modal/products/delete';
import InsertProductModal from '../modal/products/insert';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ClipLoader } from "react-spinners";
export default function ProductsTabAdmin() {
    const [modal, setModal] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productsData, setProductsData] = useState([]);
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        setModal("edit");
    };

    const handleCloseModal = () => {
        setModal("");
        setSelectedProduct(null);
    };

    const handleOpenDeleteModal = (product) => {
        setSelectedProduct(product);
        setModal("delete");
    };

    const handleOpenInsertModal = () => {
        setModal("insert");
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [currentItemsPerPage, setCurrentItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            fetchData(currentPage - 1, currentItemsPerPage, searchText);
        };
    };


    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            fetchData(currentPage + 1, currentItemsPerPage, searchText);
        };
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        fetchData(page, currentItemsPerPage, searchText);
    };

    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const submitSearch = () => {
        setSearchQuery(searchText);
        fetchData(1, currentItemsPerPage, searchText);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitSearch();
        }
    };

    const clearSearch = () => {
        setSearchText('');
    };

    const fetchData = async (page = currentPage, limit = currentItemsPerPage, search = searchText) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?page=${page}&limit=${limit}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProductsData(response.data.data);
            setCurrentPage(response.data.page);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (

        <div className="py-4">
            {modal === "edit" &&
                <EditProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onSuccess={() => {
                        handleCloseModal();
                        fetchData();
                        setSuccess("Produk berhasil diubah");
                    }}
                />
            }
            {modal === "delete" &&
                <DeleteProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onSuccess={() => {
                        handleCloseModal();
                        fetchData();
                        setSuccess("Produk berhasil dihapus");
                    }}
                />
            }
            {modal === "insert" &&
                <InsertProductModal
                    onSuccess={() => {
                        handleCloseModal();
                        fetchData();
                        setSuccess("Produk berhasil ditambahkan");
                    }}
                    onClose={handleCloseModal}
                />
            }
            <div className="flex justify-between w-full items-center mb-8">
                <div className="pe-4 md:pe-8">
                    <button
                        className="bg-secondary hover:bg-secondary-800 text-white dark:text-gray-900 rounded-lg py-2 shadow-md flex justify-center items-center gap-4 px-4"
                        onClick={handleOpenInsertModal}
                    >
                        <PlusIcon width={16} height={16} />
                        <div className="text-sm hidden md:block">Tambah Produk</div>
                    </button>
                </div>
                <div className="flex gap-2 p-2">
                    <input
                        type="text"
                        placeholder="Cari Produk..."
                        className="border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white h-10 p-4 rounded-md w-5/6 md:w-auto"
                        value={searchText}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    {searchText && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-[100px] top-[218px] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <XIcon size={20} height={20} className='text-secondary dark:text-secondary-800' />
                        </button>
                    )}
                    <button
                        className="bg-secondary hover:bg-secondary-800 text-white dark:text-gray-900 rounded-lg py-2 shadow-md flex justify-center items-center h-10 w-10"
                        onClick={submitSearch}
                    >
                        <SearchIcon width={16} height={16} />
                    </button>
                </div>
            </div>
            {success && (
                <h3 className="text-sm p-4 rounded-md font-semibold text-green-500 bg-green-200 mb-4">{success}</h3>
            )}
            <div className="bg-white dark:bg-gray-900 rounded-lg h-full">
                <div className={`w-full h-96 flex justify-center items-center ${loading ? '' : 'hidden'}`}>
                    <ClipLoader color="#58a840" size={50} />
                </div>
                <div className={`${loading ? 'hidden' : ''}`}>
                    {productsData.length > 0 ? (
                        <div>
                            <ProductsTable
                                data={productsData}
                                handleOpenEditModal={handleOpenEditModal}
                                handleOpenDeleteModal={handleOpenDeleteModal}
                                currentPage={currentPage}
                                onNextPage={goToNextPage}
                                onPreviousPage={goToPreviousPage}
                                itemsPerPage={currentItemsPerPage}
                                totalPages={totalPages}
                                totalItems={totalItems}
                                goToPage={goToPage}
                            />
                        </div>
                    ) : (
                        <div className='w-full h-96 flex justify-center items-center'>
                            <div className='text-gray-600 dark:text-gray-400 font-bold'>Produk tidak ditemukan</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}