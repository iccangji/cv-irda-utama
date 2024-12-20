import { useEffect, useState } from "react";
import {
    PlusIcon
} from '@heroicons/react/outline';
import InsertCategoryModal from "../modal/categories/insert";
import EditCategoryModal from "../modal/categories/edit";
import DeleteCategoryModal from "../modal/categories/delete";
import Cookies from 'js-cookie';
import axios from 'axios';
import CategoriesTable from "../table/categories";
export default function CategoriesTabAdmin() {
    const [modal, setModal] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoriesData, setCategoriesData] = useState([]);
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const handleOpenEditModal = (product) => {
        setSelectedCategory(product);
        setModal("edit");
    };

    const handleCloseModal = () => {
        setModal("");
        setSelectedCategory(null);
    };

    const handleOpenDeleteModal = (category) => {
        setSelectedCategory(category);
        setModal("delete");
    };

    const handleOpenInsertModal = () => {
        setModal("insert");
    };

    const fetchData = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategoriesData(response.data.data);

        } catch (err) {
            console.log(err);

        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (

        <div className="py-4">
            {modal === "edit" &&
                <EditCategoryModal
                    product={selectedCategory}
                    onClose={handleCloseModal}
                    onSuccess={() => {
                        handleCloseModal();
                        fetchData();
                        setSuccess("Kategori berhasil diubah");
                    }}
                />
            }
            {modal === "delete" &&
                <DeleteCategoryModal
                    category={selectedCategory}
                    onClose={handleCloseModal}
                    onSuccess={() => {
                        handleCloseModal();
                        fetchData();
                        setSuccess("Kategori berhasil dihapus");
                    }}
                />
            }
            {modal === "insert" &&
                <InsertCategoryModal
                    onSuccess={() => {
                        handleCloseModal();
                        fetchData();
                        setSuccess("Kategori berhasil ditambahkan");
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
                        <div className="text-sm hidden md:block">Tambah Kategori</div>
                    </button>
                </div>
                <div className="flex gap-2 py-4">
                    <div className="p-3"></div>
                </div>
            </div>
            {success && (
                <h3 className="text-sm p-4 rounded-md font-semibold text-green-500 bg-green-200 mb-4">{success}</h3>
            )}
            {error && (
                <h3 className="text-sm p-4 rounded-md font-semibold text-red-500 bg-red-200 mb-4">{error}</h3>
            )}
            <div className="bg-white dark:bg-gray-900 rounded-lg h-full">
                {categoriesData.length > 0 ? (
                    <div>
                        <CategoriesTable
                            data={categoriesData}
                            handleOpenEditModal={handleOpenEditModal}
                            handleOpenDeleteModal={handleOpenDeleteModal}
                        />
                    </div>
                ) : (
                    <div className='w-full h-96 flex justify-center items-center'>
                        <div className='text-gray-600 dark:text-gray-400 font-bold'>Kategori tidak ditemukan</div>
                    </div>
                )}
            </div>
        </div>
    )
}