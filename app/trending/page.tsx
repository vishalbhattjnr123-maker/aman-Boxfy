"use client";

import { movies, categorizedMovies } from "@/data/movies";
import { MovieGrid } from "@/components/movie-grid/MovieGrid";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { Flame, Sparkles, TrendingUp } from "lucide-react";

export default function TrendingPage() {
    const trending = categorizedMovies["Trending Now"] || movies.slice(0, 10);
    const topRated = categorizedMovies["Top Rated Releases"] || movies.slice(10, 20);
    const top20 = [
        movies[0], movies[12], movies[31], movies[46], movies[7],
        movies[21], movies[40], movies[28], movies[1], movies[13],
        movies[32], movies[47], movies[8], movies[22], movies[41],
        movies[2], movies[14], movies[33], movies[9], movies[23]
    ].filter(Boolean) as typeof movies;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-6">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                    <Flame className="w-4 h-4 fill-current" />
                    <span>Hottest Releases</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                    Trending Right Now
                </h1>
                <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
                    The most-watched 3D animations, AI films, and viral videos streamed this week.
                </p>
            </div>

            {/* Featured Rows */}
            <div className="flex flex-col gap-8 relative z-20">
                <MovieRow title="🔥 Trending Now Worldwide" movies={trending} />
                <MovieRow title="⭐ Highest Rated Fan Favorites" movies={topRated} />
            </div>

            {/* Top 20 Grid */}
            <div className="mt-8 pb-16">
                <MovieGrid
                    movies={top20}
                    title="Top 20 Leaderboard"
                    subtitle="Ranked by view count and audience appreciation score."
                />
            </div>
        </div>
    );
}
