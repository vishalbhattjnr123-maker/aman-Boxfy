"use client";

import { useState } from "react";
import { categorizedMovies } from "@/data/movies";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { MovieGrid } from "@/components/movie-grid/MovieGrid";
import { Grid, Sparkles, Filter } from "lucide-react";

export default function CategoriesPage() {
    const categoryEntries = Object.entries(categorizedMovies);
    const categoryNames = ["All", ...categoryEntries.map(([name]) => name)];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredEntries = selectedCategory === "All"
        ? categoryEntries
        : categoryEntries.filter(([name]) => name === selectedCategory);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-6">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                    <Grid className="w-4 h-4" />
                    <span>Curated Genres</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                    All Categories & Genres
                </h1>
                <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
                    Explore high-definition 3D animations, superhero sagas, and AI productions organized by genre.
                </p>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pt-6 pb-2">
                    {categoryNames.map((name) => {
                        const active = selectedCategory === name;
                        return (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedCategory(name)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${
                                    active
                                        ? "bg-red-600 text-white shadow-red-600/30"
                                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10"
                                }`}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Display */}
            <div className="flex flex-col gap-6 md:gap-10 relative z-20 pb-16">
                {selectedCategory === "All" ? (
                    filteredEntries.map(([title, movies]) => (
                        <div
                            key={title}
                            id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                            className="scroll-mt-24"
                        >
                            <MovieRow
                                title={title}
                                movies={movies as any}
                                seeAllHref={`/categories#${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            />
                        </div>
                    ))
                ) : (
                    <div className="pt-2">
                        {filteredEntries.map(([title, movies]) => (
                            <MovieGrid
                                key={title}
                                movies={movies as any}
                                title={title}
                                subtitle={`Viewing ${movies.length} titles in this genre`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
