import Head from 'next/head'
import About from '../components/section/about'
import Testimony from '../components/section/about/testimony'
import Location from '../components/section/location'
import Footer from '../components/section/footer'
import Navbar from '../components/section/navbar'

import { Inter } from 'next/font/google'
import ScrollToTopButton from '../components/scroll_to_top'
import MessageButton from '../components/message_button'
import Contact from '../components/section/about/contact'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export default function AboutUs() {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>CV Irda Utama - Tentang Kami</title>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='CV. Irda Utama website'
				/>
			</Head>
			<div className={`dark:bg-gray-900 bg-gray-200 p-2 w-full` + inter.className}>
				{/* Header */}
				<header>
					<Navbar />
				</header>
				{/* Main Section */}
				<About enableBackground={true} />
				<Testimony />
				<Location enableBackground={true} />
				<Contact />
				{/* Footer */}
			</div>
			<Footer />
			<ScrollToTopButton />
			<MessageButton />
		</>
	)
}
