import { ChevronUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRender, setRender] = useState(false);

    // Fungsi untuk menangani scroll dan menampilkan tombol
    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight; // Posisi scroll saat ini + 
        const pageHeight = document.documentElement.scrollHeight;


        if (window.scrollY > 300 && scrollPosition + 32 < pageHeight) {
            setRender(true);
            setIsVisible(true);
        } else {
            setIsVisible(false);
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {isRender && (
                <button
                    onClick={scrollToTop}
                    className={`fixed font-bold bottom-5 left-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-800 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 h-12 w-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                    <ChevronUp width={24} height={24} />
                </button>
            )}
        </div>
    );
}

export default ScrollToTopButton;
