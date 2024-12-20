import { XIcon } from "@heroicons/react/outline";
import { ClipLoader } from "react-spinners";
import Cookies from 'js-cookie';
import axios from "axios";
import { useState } from "react";
const DeleteCategoryModal = ({ category, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleDeleteData = async () => {
        setLoading(true);

        if (category.count !== 0) {
            setError("Kategori ini memiliki produk. Hapus produk terlebih dahulu.");
            setLoading(false);
            return;
        }

        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${category.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                onSuccess();
            }
            else {
                setError("Terjadi kesalahan saat menghapus produk");
            }
        } catch (err) {
            console.log(err);
            setError("Terjadi kesalahan saat menghapus produk");
        }
        setLoading(false);
    }
    return (
        <div
            className="fixed top-50 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-[calc(100%-1rem)] min-h-full bg-gray-900 bg-opacity-50 flex"
        >
            {loading && (<div className="absolute top-50 left-50 z-20"><ClipLoader size={120} color='#ff9247' cssOverride={{ display: 'block' }} /></div>)}
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Hapus Produk
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <XIcon width={32} height={32} className="md:w-8 md:h-8 h-6 w-6" />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 space-y-6 text-gray-900 dark:text-white">
                        {error && <h3 className="text-sm p-4 rounded-md font-semibold text-red-500 bg-red-200">{error}</h3>}
                        <div className="mt-0">Hapus {category.name} dari data produk?</div>
                    </div >
                    <div className="flex items-center px-4 py-2 pb-4 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            className="text-white bg-secondary hover:bg-secondary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                            onClick={handleDeleteData}
                        >
                            Hapus
                        </button>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default DeleteCategoryModal;