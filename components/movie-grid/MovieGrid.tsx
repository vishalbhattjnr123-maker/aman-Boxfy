"use client";

import { MovieCard } from "@/components/movie-card/MovieCard";

interface MovieGridProps {
    movies: any[];
    title?: string;
    subtitle?: string;
}

export const MovieGrid = ({ movies, title, subtitle }: MovieGridProps) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 mb-4 text-2xl">
                    🎬
                </div>
                <p className="text-zinc-400 font-medium text-lg">No content found</p>
                <p className="text-zinc-600 text-sm mt-1">Try exploring other categories or search terms</p>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 py-8 md:py-12">
            {(title || subtitle) && (
                <div className="mb-6 md:mb-8">
                    {title && (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="text-zinc-400 text-sm md:text-base mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                {movies.map((movie, index) => (
                    <div key={movie.id || index} className="w-full">
                        <MovieCard movie={movie} priority={index < 4} />
                    </div>
                ))}
            </div>
        </div>
    );
};
