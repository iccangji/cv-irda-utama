import { XIcon } from "@heroicons/react/outline";
import categories from "../../../../../../data/category";
import { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { ClipLoader } from "react-spinners";
const InsertCategoryModal = ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleInsertData = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const token = Cookies.get('token');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
                {
                    name: e.target.name.value
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                onSuccess();
            }
            else {
                setError("Terjadi kesalahan saat menambahkan kategori");
            }
        } catch (err) {
            console.log(err);
            setError("Terjadi kesalahan saat menambahkan kategori");
        }
        setLoading(false);
    }
    return (
        <div
            className="fixed top-50 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] min-h-full bg-gray-900 bg-opacity-50 flex scrollbar-hide pb-10"
        >
            {loading && (<div className="absolute top-50 left-50 z-20"><ClipLoader size={120} color='#ff9247' cssOverride={{ display: 'block' }} /></div>)}
            <div className="relative w-full max-w-2xl max-h-full">
                <form className="relative bg-white rounded-lg shadow dark:bg-gray-700" onSubmit={handleInsertData}>
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Tambah Kategori
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
                    <div className="p-6 space-y-6">
                        {error && <h3 className="text-sm p-4 rounded-md font-semibold text-red-500 bg-red-200">{error}</h3>}
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                <input type="text" name="name" id="name" className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md" placeholder="Masukkan nama kategori" required="" />
                            </div>
                        </div>
                    </div >
                    <div className="flex items-center px-6 py-2 pb-4 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="submit" className="text-gray-900 bg-secondary hover:bg-secondary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Tambah</button>
                    </div>
                </form >
            </div >
        </div >
    );
}

export default InsertCategoryModal;