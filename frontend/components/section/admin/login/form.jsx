import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
const LoginForm = ({ formData, setFormData, onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div>
                <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">Username</label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md"
                        placeholder="Masukkan username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">Password</label>
                </div>
                <div className="mt-2 flex">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className="shadow-sm border-[1px] border-gray-400 dark:border-gray-600 focus:outline-none focus:border-secondary text-md dark:focus:border-secondary-800 dark:text-white p-2.5 w-full rounded-md"
                        placeholder="Masukkan password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex items-center absolute right-8 sm:left-[30rem] mt-4 md:mt-3"
                    >
                        {showPassword ? (
                            <EyeOffIcon width={32} height={32} className="md:w-6 md:h-6 h-4 w-4 text-secondary text-opacity-70" />
                        ) : (
                            <EyeIcon width={32} height={32} className="md:w-6 md:h-6 h-4 w-4 text-secondary text-opacity-70" />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary dark:bg-primary-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            </div>
        </form>
    );
}

export default LoginForm;