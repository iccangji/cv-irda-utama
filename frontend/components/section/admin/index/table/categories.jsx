
import Image from "next/image";
import { useState } from "react";
const CategoriesTable = ({ data, handleOpenEditModal, handleOpenDeleteModal, onNextPage, onPreviousPage, currentPage, itemsPerPage, totalPages, goToPage, totalItems }) => {

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
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Jumlah Produk
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
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {item.name}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {item.count}
                            </th>
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
        </div >
    );
}

export default CategoriesTable;