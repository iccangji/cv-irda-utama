import Image from 'next/image';
const Hero = () => {
	return (
		<section className='relative container flex flex-col-reverse lg:flex-row gap-12 mt-10 lg:mt-10 w-full dark:bg-gray-900'>
			{/* Image */}
			<div className='flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10'>
				<Image
					src='/img/banner_irda_utama.png'
					alt=''
					width={800}
					height={800}
					className='w-full h-full lg:w-full lg:h-full banner object-cover rounded-xl'
				/>
			</div>
		</section>
	);
};

export default Hero;
