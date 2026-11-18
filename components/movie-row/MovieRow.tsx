"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "../movie-card/MovieCard";

interface MovieRowProps {
    title: string;
    movies: any[];
    seeAllHref?: string;
}

export const MovieRow = ({ title, movies, seeAllHref }: MovieRowProps) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const targetHref = seeAllHref || `/categories#${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`;

    const handleScroll = (direction: "left" | "right") => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = clientWidth * 0.75;
            const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const handleScrollEvent = () => {
        if (rowRef.current) {
            setIsScrolled(rowRef.current.scrollLeft > 10);
            setCanScrollRight(
                rowRef.current.scrollLeft < rowRef.current.scrollWidth - rowRef.current.clientWidth - 15
            );
        }
    };

    useEffect(() => {
        handleScrollEvent();
        const handleResize = () => handleScrollEvent();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [movies]);

    if (!movies || movies.length === 0) return null;

    return (
        <div className="relative pl-4 sm:pl-6 md:pl-10 lg:pl-12 py-3 lg:py-5 group flex flex-col">
            {/* Header: Title + Working See All link */}
            <div className="flex items-center justify-between pr-4 sm:pr-6 md:pr-10 lg:pr-12 mb-3">
                <Link
                    href={targetHref}
                    className="group/title flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-md">
                        {title}
                    </h2>
                    <span className="text-xs font-semibold text-red-500 opacity-0 group-hover/title:opacity-100 transition-opacity hidden md:inline-flex items-center">
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                </Link>

                <Link
                    href={targetHref}
                    className="flex items-center gap-1 text-xs md:text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                    <span>See All</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {/* Carousel Container */}
            <div className="relative -ml-4 sm:-ml-6 md:-ml-10 lg:-ml-12 pl-4 sm:pl-6 md:pl-10 lg:pl-12">
                {/* Left Arrow Button */}
                <button
                    type="button"
                    onClick={() => handleScroll("left")}
                    aria-label="Scroll left"
                    className={`absolute left-0 top-0 bottom-6 w-12 md:w-16 z-30 hidden md:flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-black via-black/80 to-transparent ${
                        isScrolled ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="bg-black/70 backdrop-blur-md shadow-2xl p-2.5 rounded-full border border-white/20 hover:bg-white/20 hover:scale-110 transition-transform">
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </div>
                </button>

                {/* Movie items row */}
                <div
                    ref={rowRef}
                    onScroll={handleScrollEvent}
                    className="flex space-x-3 sm:space-x-4 lg:space-x-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pt-2 pb-6 pr-4 sm:pr-6 md:pr-10 lg:pr-12"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {movies.map((movie, index) => (
                        <div
                            key={movie.id || index}
                            className="w-[68vw] sm:w-[42vw] md:w-[260px] lg:w-[300px] xl:w-[320px] flex-shrink-0 snap-start"
                        >
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow Button */}
                <button
                    type="button"
                    onClick={() => handleScroll("right")}
                    aria-label="Scroll right"
                    className={`absolute right-0 top-0 bottom-6 w-12 md:w-16 z-30 hidden md:flex items-center justify-center transition-all duration-300 bg-gradient-to-l from-black via-black/80 to-transparent ${
                        canScrollRight ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="bg-black/70 backdrop-blur-md shadow-2xl p-2.5 rounded-full border border-white/20 hover:bg-white/20 hover:scale-110 transition-transform">
                        <ChevronRight className="w-6 h-6 text-white" />
                    </div>
                </button>
            </div>
        </div>
    );
};
