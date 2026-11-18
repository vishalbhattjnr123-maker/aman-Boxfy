"use client";

import { useState } from "react";
import { movies } from "@/data/movies";
import { MovieGrid } from "@/components/movie-grid/MovieGrid";
import { Film, SlidersHorizontal } from "lucide-react";

export default function MoviesPage() {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortBy, setSortBy] = useState<"featured" | "rating" | "year">("featured");

    const filterTags = ["All", "3D", "Entertainment", "Film", "Ads", "Kids", "Music", "Mahabharat"];

    let filtered = movies.filter((movie) => {
        if (selectedFilter === "All") return true;
        const search = selectedFilter.toLowerCase();
        return (
            movie.genre?.some((g) => g.toLowerCase().includes(search)) ||
            movie.title.toLowerCase().includes(search)
        );
    });

    if (sortBy === "rating") {
        filtered = [...filtered].sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
    } else if (sortBy === "year") {
        filtered = [...filtered].sort((a, b) => (b.year || 0) - (a.year || 0));
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header & Filter Controls */}
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                    <Film className="w-4 h-4" />
                    <span>Cinematic Library</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                            All Movies & Productions
                        </h1>
                        <p className="text-zinc-400 text-sm md:text-base mt-1">
                            Browse {movies.length} full-length AI & 3D productions in 4K resolution.
                        </p>
                    </div>

                    {/* Sort Selector */}
                    <div className="flex items-center gap-2 self-start sm:self-auto bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-xl text-xs sm:text-sm">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-zinc-400 font-medium">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-transparent text-white font-semibold outline-none cursor-pointer"
                        >
                            <option value="featured" className="bg-zinc-900 text-white">Featured</option>
                            <option value="rating" className="bg-zinc-900 text-white">Highest Rating</option>
                            <option value="year" className="bg-zinc-900 text-white">Newest First</option>
                        </select>
                    </div>
                </div>

                {/* Genre Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pt-6 pb-2">
                    {filterTags.map((tag) => {
                        const active = selectedFilter === tag;
                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setSelectedFilter(tag)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${
                                    active
                                        ? "bg-red-600 text-white shadow-red-600/30"
                                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10"
                                }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Movie Grid */}
            <MovieGrid movies={filtered} />
        </div>
    );
}
