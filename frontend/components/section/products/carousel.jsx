import CarouselProductsCard from './card/carousel';
import React, { useRef, useState, useEffect } from 'react';
import {
    ChevronRightIcon,
    ChevronLeftIcon,
} from '@heroicons/react/outline';

const CarouselProducts = ({ data }) => {
    const sliderRef = useRef();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({
            left: -300,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({
            left: 300,
            behavior: 'smooth',
        });

    };


    const checkScrollPosition = () => {
        if (sliderRef.current) {
            const isAtStart = sliderRef.current.scrollLeft === 0;
            const isAtEnd =
                sliderRef.current.scrollLeft + 32 >=
                sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

            setShowLeftButton(!isAtStart);
            setShowRightButton(!isAtEnd);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const interval = setInterval(checkScrollPosition, 100);
        return () => clearInterval(interval);
    }, []);
    return (
        <div
            className="relative w-full mx-auto mt-4 md:mt-10"
        >
            {showLeftButton && (
                <button
                    onClick={scrollLeft}
                    className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 border-[1px] border-primary text-white dark:text-gray-800 bg-primary dark:bg-primary-800 p-2 rounded-lg shadow-lg ms-2"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            )}
            <div
                className="overflow-x-scroll flex gap-4 p-4 scroll-snap-x snap-mandatory scrollbar-hide"
                ref={sliderRef}
                onScroll={checkScrollPosition}
            >
                {data.map((item, index) => (
                    <CarouselProductsCard
                        key={index}
                        id={item.id}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
            {showRightButton && (
                <button
                    onClick={scrollRight}
                    className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 border-[1px] border-primary text-white dark:text-gray-800 bg-primary dark:bg-primary-800 p-2 rounded-lg shadow-lg me-2"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default CarouselProducts;
