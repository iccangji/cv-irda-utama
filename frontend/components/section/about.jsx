import Image from 'next/image';
import SectionHeading from '../section_heading';
const About = ({ enableBackground }) => {
	return (
		<section className={`py-10 md:py-20 my-10 rounded-lg mx-4 ${enableBackground ? 'bg-white dark:bg-gray-800' : ''}`}>
			{/* Heading */}
			<div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
				<SectionHeading text={"Tentang Kami"} />
				<p className='text-center text-secondary dark:text-secondary-800 mt-2 font-bold'>
					CV. IRDA UTAMA
				</p>
			</div>
			{/* Cards */}
			<div className='container flex flex-col md:flex-row justify-around gap-2 md:gap-16 md:gap-8 mt-16 px-4 md:px-10'>
				<Image src="/img/irda-utama.png" alt="" width={800} height={800} className='w-full object-cover rounded-lg flex-0 w-96 h-80' />
				<div className='w-full rounded-lg md:px-8 py-8 md:py-0 md:py-4 shrink text-gray-900 dark:text-white grow w-80'>
					<p className='mb-2 text-justify'>
						<span className='font-bold'>CV. Irda Utama</span> hadir untuk memberikan di warna baru di bidang percetakan hadir dan memberikan solusi bagi pelanggan, melayani dengan tulus serta menghadirkan produk yg berkualitas.
					</p>
					<p className='mb-2 text-justify'>
						Visi kami adalah kepuasan pelanggan yang utama.
					</p>
					<p className='mb-2 text-justify'>
						Misi kami kami hadir adalah untuk memberikan pelayanan yang prima.
					</p>
				</div>
			</div>
		</section>
	);
};

export default About;
