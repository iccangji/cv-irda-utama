import React, { useState, useEffect } from 'react';
import SectionHeading from "../../section_heading";

const Testimony = ({ }) => {

	return (
		<section className={`lg:mt-10 py-10 mb-10 rounded-lg mx-4'`}>
			<div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
				<SectionHeading text="Proses Pencetakan" />
			</div>
			<div className='container'>
				{/* Heading */}
				<div className='w-full mx-auto px-2'>
					<div className="flex flex-col gap-2 py-2 justify-center items-center">
						<p className='text-center text-secondary dark:text-secondary-800 mb-12 font-bold w-100'>
							Proses Pencetakan Baliho dan Buku
						</p>
						<div className="flex flex-col md:flex-row p-4 gap-20">
							<video src="/video/video_baliho.mp4" controls width={320} height={320} className='w-72 h-full' />
							<video src="/video/video_buku.mp4" controls width={320} height={320} className='w-72 h-full' />
						</div>
					</div>
				</div>
			</div>
		</section >
	);
};

export default Testimony;