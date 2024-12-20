import React, { useState, useEffect } from 'react';
import SectionHeading from "../section_heading";

const Location = ({ enableBackground }) => {
	const [windowHeight, setWindowHeight] = useState(0);

	useEffect(() => {

		if (typeof window !== 'undefined') {
			setWindowHeight(window.innerHeight);
			const handleResize = () => {
				setWindowHeight(window.innerHeight);
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);

	return (
		<section className={`lg:mt-10 py-10 mb-10 rounded-lg mx-4 ${enableBackground ? 'bg-white dark:bg-gray-800' : ''}`}>
			<div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
				<SectionHeading text="Lokasi Kami" />
			</div>
			<div className='container'>
				{/* Heading */}
				<div className='w-full mx-auto px-2'>
					<div className="flex flex-col gap-2 py-2 justify-center items-center">
						<p className='text-center text-secondary dark:text-secondary-800 mb-12 font-bold w-100'>
							Jl. HEA Mokodompit, Kambu, Kec. Kambu, Kota Kendari, Sulawesi Tenggara
						</p>
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.0126264522196!2d122.5156365!3d-4.0178084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d988d2cfd1abbb9%3A0xa74122b029a3fdf7!2sCV%20IRDA%20utama!5e0!3m2!1sid!2sid!4v1733933244387!5m2!1sid!2sid" width="80%" height={windowHeight < 600 ? "450" : "250"}></iframe>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Location;