import { XIcon } from "@heroicons/react/outline";
import categories from "../../../../../../data/category";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Cookies from 'js-cookie';
import axios from "axios";
import { useEffect } from "react";
const EditProductModal = ({ product, onClose, onSuccess }) => {
    const [category, setCategory] = useState(product.category)
    const [isReady, setIsReady] = useState(product.isReady === 1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [imageUrl, setImageUrl] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`);
    const [fileUpload, setFileUpload] = useState("");
    const [categories, setCategories] = useState([]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);
            setFileUpload(file);
        }
    };
    const handleEditData = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (
            isNaN(e.target.price.value)
        ) {
            setLoading(false);
            setError("Pastikan data yang diubah valid");
            return;
        }

        const formData = new FormData();
        formData.append('image', fileUpload);
        formData.append('name', e.target.name.value);
        formData.append('price', e.target.price.value);
        formData.append('description', e.target.description.value);
        formData.append('isReady', e.target.isReady.value);
        formData.append('category', e.target.category.value);

        try {
            const token = Cookies.get('token');
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${product.id}`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                onSuccess();
            }
            else {
                setError("Terjadi kesalahan saat mengedit produk");
            }
        } catch (err) {
            console.log(err);
            setError("Terjadi kesalahan saat mengedit produk");
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(response.data.data);
            } catch (err) {
                console.log(err);
            }


        };

        fetchCategories();
    }, []);
    return (
        <div
            className="fixed top-50 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] min-h-full bg-gray-900 bg-opacity-50 flex scrollbar-hide pb-10"
        >
            {loading && (<div className="absolute top-50 left-50 z-20"><ClipLoader size={120} color='#ff9247' cssOverride={{ display: 'block' }} /></div>)}
            <div className="relative w-full max-w-2xl max-h-full">
                <form
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                    onSubmit={handleEditData}
                    encType="multipart/form-data"
                >
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit Produk
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
                        <div className="flex flex-col items-start justify-start w-full gap-4">
                            <img src={imageUrl} alt="" className="w-32 h-32 object-cover shadow-md" />
                            <button
                                className="bg-secondary shadow-md text-sm text-gray-900 px-2 py-1 rounded"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("fileInput").click();
                                }}
                            >
                                Pilih gambar
                            </button>

                            <input
                                id="fileInput"
                                type="file"
                                name="image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                <input type="text" name="name" id="name" className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md" placeholder={product.name} required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                                <input type="text" name="price" id="price" className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md" placeholder={product.price} required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                                <select
                                    className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md"
                                    required=""
                                    value={category}
                                    name="category"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map((category, index) => (
                                        <option
                                            key={index}
                                            value={category.id}
                                            className="text-gray-900 px-2 dark:text-white"
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md" required="" value={isReady} onChange={(e) => {
                                    setIsReady(e.target.value);
                                }} name="isReady">
                                    <option
                                        value={true}
                                        className="text-gray-900 px-2 dark:text-white"
                                    >
                                        Ready
                                    </option>
                                    <option
                                        value={false}
                                        className="text-gray-900 px-2 dark:text-white"
                                    >
                                        Habis
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                            <textarea type="text" name="description" id="description" className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md w-full h-20" placeholder={product.description} required="" />
                        </div>
                    </div >
                    <div className="flex items-center px-6 py-2 pb-4 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="submit" className="text-gray-900 bg-secondary hover:bg-secondary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Edit</button>
                    </div>
                </form >
            </div >
        </div >
    );
}

export default EditProductModal;