"use client";

import { useState } from "react";
import { movies } from "@/data/movies";
import { MovieGrid } from "@/components/movie-grid/MovieGrid";
import { Search, X, Sparkles, TrendingUp } from "lucide-react";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const popularTags = [
        "3D Animation",
        "Kuku Boy",
        "Mahabharat",
        "AI Film",
        "Ads",
        "Game",
        "Music",
        "Kids",
    ];

    const filteredMovies = query.trim()
        ? movies.filter((m) => {
              const q = query.toLowerCase().trim();
              return (
                  m.title.toLowerCase().includes(q) ||
                  m.genre?.some((g) => g.toLowerCase().includes(q)) ||
                  m.description?.toLowerCase().includes(q)
              );
          })
        : [];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Search Input Bar */}
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-6">
                <div className="relative max-w-3xl">
                    <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-zinc-400" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search movies, superheroes, genres, 3D animations..."
                        className="block w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-13 pr-12 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all text-base sm:text-lg shadow-2xl"
                        autoFocus
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* Quick Trending Searches */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pt-4">
                    <span className="text-zinc-500 text-xs font-semibold flex items-center gap-1 shrink-0">
                        <TrendingUp className="w-3.5 h-3.5" /> Popular:
                    </span>
                    {popularTags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => setQuery(tag)}
                            className="whitespace-nowrap px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Results / Recommended Content */}
            <div className="pb-16">
                {query.trim() ? (
                    filteredMovies.length > 0 ? (
                        <MovieGrid
                            movies={filteredMovies}
                            title={`Results for "${query}"`}
                            subtitle={`Found ${filteredMovies.length} matching titles`}
                        />
                    ) : (
                        <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] py-16 text-center max-w-lg mx-auto">
                            <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 mx-auto mb-4 text-2xl">
                                🔍
                            </div>
                            <h3 className="text-xl font-bold mb-2">No matching results</h3>
                            <p className="text-zinc-400 text-sm mb-6">
                                We couldn't find anything matching &quot;{query}&quot;. Try searching for &quot;3D&quot;, &quot;Kuku&quot;, or &quot;Mahabharat&quot;.
                            </p>
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition"
                            >
                                Clear Search
                            </button>
                        </div>
                    )
                ) : (
                    <div>
                        <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pb-2">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                                Recommended While You Search
                            </h3>
                        </div>
                        <MovieGrid movies={movies.slice(0, 15)} />
                    </div>
                )}
            </div>
        </div>
    );
}
