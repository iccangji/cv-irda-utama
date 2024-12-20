import Head from 'next/head'
import About from '../components/section/about'
import Location from '../components/section/location'
import Product from '../components/section/index/product'
import Footer from '../components/section/footer'
import Hero from '../components/section/index/hero'
import Navbar from '../components/section/navbar'

import { Inter } from 'next/font/google'
import ScrollToTopButton from '../components/scroll_to_top'
import MessageButton from '../components/message_button'
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})
export default function Home() {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>CV Irda Utama</title>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='CV. Irda Utama website'
				/>
			</Head>
			<div className={`dark:bg-gray-900 bg-dark-100 p-2 w-full h-screen` + inter.className}>
				{/* Header */}
				<header>
					<Navbar />
				</header>
				{/* Main Section */}
				<Hero />
				<Product />
				<About enableBackground={false} />
				<Location enableBackground={true} />
				{/* Footer */}
			</div>
			<Footer />
			<ScrollToTopButton />
			<MessageButton />
		</>
	)
}
