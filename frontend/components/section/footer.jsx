import {
	LocationMarkerIcon,
	ClockIcon,
	PhoneIcon
} from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
	{ name: 'Home', href: '/', current: false },
	{ name: 'Produk', href: '/products', current: false },
	{ name: 'Tentang Kami', href: '/about', current: false },
]


const Footer = () => {
	return (
		<footer className='bg-gray-900 py-8 px-4'>
			<div className='container grid grid-cols-2 md:grid-cols-4 items-start justify-between gap-8'>
				<div className="flex flex-col justify-start pe-2">
					<span
						className='text-white font-bold'>
						CV. IRDA UTAMA
					</span>
					<p className="text-gray-400 py-2 text-sm ">
						Kami hadir untuk memberikan di warna baru di bidang percetakan hadir dan memberikan solusi bagi pelanggan, melayani dengan tulus serta menghadirkan produk yg berkualitas.
					</p>
				</div>
				<div className="flex flex-col justify-start md:ps-10">
					<span
						className='text-white font-bold'>
						TAUTAN
					</span>
					<ul className='flex flex-col text-white gap-1 items-start py-2'>
						{navigation.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								className="cursor-pointer text-gray-400 hover:scale-105 ease-in-out duration-200 hover:text-primary-800 hover:font-bold">
								{item.name}
							</Link>
						))}
					</ul>
				</div>
				<div className="flex flex-col justify-start grid pe-4">
					<span
						className='text-white font-bold'>
						OUTLET
					</span>
					<ul className='flex flex-col text-white gap-1 items-start'>
						<div className="flex items-center gap-2">
							<LocationMarkerIcon className='text-gray-400 h-16 w-16 md:h-11 md:w-11' />
							<p className="text-gray-400 py-2 text-sm">Jl. HEA Mokodompit, Kambu, Kec. Kambu, Kota Kendari, Sulawesi Tenggara</p>
						</div>
						<div className="flex items-center gap-2">
							<ClockIcon className='flex text-gray-400 h-6 w-6' />
							<p className="text-gray-400 py-2 text-sm">Senin - Sabtu, 07.00 - 21.00</p>
						</div>
					</ul>
				</div>
				<div className="flex flex-col justify-start ps-2">
					<span
						className='text-white font-bold'>
						KONTAK
					</span>
					<ul className='flex flex-col text-white gap-1 items-start mt-1'>
						<div className="flex items-center gap-2">
							<PhoneIcon width={24} height={24} className='text-gray-400' />
							<p className="text-gray-400 py-2 text-sm">081234567890</p>
						</div>
						<div className="flex items-center gap-2">
							<Image width={24} height={24} src="/img/whatsapp.svg" alt="Whatsapp" />
							<p className="text-gray-400 py-2 text-sm">081234567890</p>
						</div>
					</ul>
				</div>
			</div>
			<hr className='border-1 border-white w-full mt-12' />
			<h1 className='w-full mt-8 text-white font-bold' >
				© CV. IRDA UTAMA. 2024
			</h1>
		</footer>
	);
};

export default Footer;
