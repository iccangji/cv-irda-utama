import SectionHeading from "../../section_heading";
import {
	LocationMarkerIcon,
	ClockIcon,
	PhoneIcon
} from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Contact = () => {
	const { theme } = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;

	return (
		<section className='lg:mt-10 py-10 mb-10 rounded-lg mx-4 bg-white dark:bg-gray-700'>
			<div className='sm:w-3/4 lg:w-1/2 mx-auto'>
				<SectionHeading text={"Kontak Kami"} />
				<h1 className='text-sm font-bold text-center text-primary dark:text-primary-800 mt-2 px-10'>
					Silahkan datang ke outlet kami atau menghubungi kami<br />untuk mendapatkan produk terbaru.
				</h1>
			</div>
			<div className='md:ps-48 container flex flex-col md:flex-row justify-around gap-6 md:gap-16 px-10 mt-4'>
				<div className="flex justify-stretch flex-col md:flex-row">
					<ul className='flex flex-col text-white gap-1 items-start w-80'>
						<div className="flex items-center gap-2 pe-2">
							<LocationMarkerIcon className='text-gray-900 dark:text-white h-10 w-10' />
							<p className="text-gray-900 dark:text-white py-2 text-md font-medium">Jl. HEA Mokodompit, Kambu, Kec. Kambu, Kota Kendari, Sulawesi Tenggara</p>
						</div>
						<div className="flex items-center gap-2">
							<ClockIcon className='flex text-gray-900 dark:text-white h-6 w-6' />
							<p className="text-gray-900 dark:text-white py-2 text-md font-medium">Senin - Sabtu, 07.00 - 21.00</p>
						</div>
					</ul>
					<ul className='flex flex-1 flex-col text-white gap-1 items-start justify-between w-80 grow mt-1'>
						<div className="flex items-center gap-2 md:h-20">
							<PhoneIcon width={24} height={24} className='text-gray-900 dark:text-white' />
							<p className="text-gray-900 dark:text-white py-2 text-md font-medium">085345120873</p>
						</div>
						<div className="flex items-center gap-2">
							<Image width={24} height={24} src={`/img/whatsapp-${currentTheme === 'dark' ? 'white' : 'black'}.svg`} className={`text-gray-900 dark:text-white`} alt="Whatsapp" />
							<p className="text-gray-900 dark:text-white py-2 text-md font-medium">085311868373</p>
						</div>
					</ul>
				</div>
			</div>
		</section >
	);
};

export default Contact;
