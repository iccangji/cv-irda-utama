import Head from 'next/head'
import Footer from '../components/section/footer'
import Navbar from '../components/section/navbar'

import { Inter } from 'next/font/google'
import ScrollToTopButton from '../components/scroll_to_top'
import MessageButton from '../components/message_button'
import TopProducts from '../components/section/products/top'
import CategoryProducts from '../components/section/products/category'
import LatestProducts from '../components/section/products/latest'
import SearchBar from '../components/section/products/search_bar'
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

import { useRouter } from 'next/router';

export default function Products() {
	const router = useRouter();
	const submitSearch = (searchText) => {
		router.push(`/products/search/${searchText}`);
	};

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>CV Irda Utama - Produk</title>
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
				<SearchBar submitSearch={submitSearch} />
				<TopProducts />
				<LatestProducts />
				<CategoryProducts />
			</div>
			<Footer />
			<ScrollToTopButton />
			<MessageButton />
		</>
	)
}
