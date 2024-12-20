import {
	MenuIcon,
	SunIcon,
	MoonIcon,
	XIcon,
} from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';

const navigation = [
	{ name: 'Home', href: '/', current: false },
	{ name: 'Produk', href: '/products', current: false },
	{ name: 'Tentang Kami', href: '/about', current: false },
]

const Navbar = ({ }) => {

	const router = useRouter();
	navigation.map((page) => {
		if (router.pathname === page.href) {
			page.isActive = true;
		} else {
			page.isActive = false;
		}

		if (page.href === '/products' && router.pathname.includes('/search')) page.isActive = true
		if (page.href === '/products' && router.pathname.includes('/products')) page.isActive = true
	})

	const { systemTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted,] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [mobileNav, setMobileNav] = useState(false);

	const toggleMenu = () => {
		if (isOpen) {
			setIsOpen(false);
			setTimeout(() => setMobileNav(false), 300)
		} else {
			setMobileNav(true);
			setTimeout(() => setIsOpen(true), 10)
		}
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const currentTheme = theme === 'system' ? systemTheme : theme;

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}
	return (
		<nav className="bg-primary dark:bg-primary-800 rounded-md shadow-md mx-4 my-2">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between z-30">
					<div className="flex flex-1 items-center justify-between">
						<div className="flex items-center sm:hidden w-1/3">
							<button className="group relative inline-flex items-center justify-center rounded-md p-2 text-white dark:text-gray-900 hover:bg-primary-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={toggleMenu}>
								{
									isOpen ? (
										<XIcon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
									) : (
										<MenuIcon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
									)
								}
								<XIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
							</button>
						</div>
						<div className="flex shrink-0 items-center grow md:flex-none justify-center md:justify-start md:w-1/4">
							<Link href={'/'}>
								<div className="flex items-center">
									<Image src={'/favicon/logo.png'} alt="" width={800} height={800} className="w-8 h-8" />
									<span
										className='text-white dark:text-gray-900 font-bold uppercase cursor-pointer p-1 rounded-lg hover:scale-105 ease-in-out duration-200 text-center hidden md:block'>
										CV. IRDA UTAMA
									</span>
								</div>
							</Link>
						</div>
						<div className="hidden sm:flex justify-center items-center w-1/2 grow">
							<div className="flex space-x-4 items-center">
								{navigation.map((item, index) => (
									<Link key={index} href={item.href} className={classNames(
										item.isActive ? 'bg-primary-800 dark:bg-primary dark:text-gray-900 text-white bg-opacity-40 dark:bg-opacity-40' : 'text-gray-100 dark:text-gray-900 hover:text-white',
										'rounded-md px-3 py-2 text-sm font-medium ease-in-out duration-150 hover:scale-105 hover:font-bold',
									)}>
										{item.name}
									</Link>
								))}
							</div>
						</div>
						<div className="flex items-center justify-end w-1/3 md:w-1/4">
							<div className="relative md:ml-3">
								<div>
									{currentTheme === 'light' ? (
										<button
											className='p-2 cursor-pointer text-white'
											onClick={() => setTheme('dark')}
										>
											<MoonIcon
												className='hover:scale-105 ease-in-out duration-200 '
												width={32}
											/>
										</button>
									) : (
										<button
											className='p-2 cursor-pointer text-gray-900'
											onClick={() => setTheme('light')}
										>
											<SunIcon
												className='hover:scale-105 ease-in-out duration-200 '
												width={32}
											/>
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{mobileNav && (
				<MobileNavbar isOpen={isOpen} />
			)}
		</nav>
	);
};


const MobileNavbar = ({ isOpen }) => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}
	return (
		<div className={`absolute top-20 w-5/6 rounded-lg flex mx-6 py-2 left-0 bg-gray-800 dark:bg-gray-900 transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} sm:hidden z-50`}>
			<div className="space-y-1 mx-2">
				{navigation.map((item, index) => (
					<Link href={item.href}
						className={classNames(
							item.isActive ? 'bg-gray-900 dark:bg-gray-900 text-white bg-opacity-50 dark:bg-opacity-0' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
							'block rounded-md px-3 py-2 text-base font-medium',
						)}>
						<div
							key={index}>
							{item.name}
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
export default Navbar;
