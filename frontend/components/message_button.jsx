import Image from 'next/image';
import React, { useState } from 'react';
function MessageButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isRender, setIsRender] = useState(false);

    // Fungsi untuk menangani hover masuk (onMouseEnter)
    const handleMouseEnter = () => {
        setIsRender(true);
        setTimeout(() => setIsHovered(true), 100);
    };

    // Fungsi untuk menangani hover keluar (onMouseLeave)
    const handleMouseLeave = () => {
        setIsHovered(false);
        setTimeout(() => setIsRender(false), 100);
    };
    return (
        <div>
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => window.open("https://wa.me/6285345120873")}
                className={`fixed bottom-5 right-5 bg-primary text-white p-3 px-4 rounded-full shadow-lg focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 z-40 flex gap-2`}
            >
                <Image width={24} height={24} src="/img/whatsapp-white.svg" alt="Whatsapp" className={`text-white transition-all duration-500`} />
                {isRender && (
                    <div className={`${isHovered ? 'opacity-100' : 'opacity-0'} transition-all duration-500 text-white text-md font-bold`}>Hubungi Kami</div>
                )}
            </button>
        </div>
    );
}

export default MessageButton;
