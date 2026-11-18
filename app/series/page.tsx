"use client";

import { useState } from "react";
import { movies } from "@/data/movies";
import { MovieGrid } from "@/components/movie-grid/MovieGrid";
import { Tv, Sparkles } from "lucide-react";

export default function SeriesPage() {
    const [activeSeries, setActiveSeries] = useState("all");

    const kukuBoy = movies.filter((m) => m.id >= "movie-031" && m.id <= "movie-039");
    const animationSeries = movies.filter((m) => m.id >= "movie-001" && m.id <= "movie-007");
    const aiFilmSeries = movies.filter((m) => m.id >= "movie-012" && m.id <= "movie-020");
    const mahabharatSeries = movies.filter((m) => m.id >= "movie-046" && m.id <= "movie-048");

    const seriesMap: Record<string, { title: string; subtitle: string; items: typeof movies }> = {
        all: {
            title: "All Web Series & Episodes",
            subtitle: "Binge episodic animated series, superhero sagas, and AI sci-fi sagas.",
            items: [...kukuBoy, ...animationSeries, ...aiFilmSeries, ...mahabharatSeries],
        },
        kuku: {
            title: "Kuku Boy: The AI Superhero (Season 1)",
            subtitle: "India's first AI-animated superhero teaching kindness, courage, and science.",
            items: kukuBoy,
        },
        animation: {
            title: "3D Animation Masterworks Series",
            subtitle: "Episodic 3D visual storytelling with state-of-the-art character design.",
            items: animationSeries,
        },
        aifilm: {
            title: "AI Film Universe (Sci-Fi Episodes)",
            subtitle: "Cinematic episodes exploring future worlds, cyberspace, and AI wonders.",
            items: aiFilmSeries,
        },
        mahabharat: {
            title: "Mahabharat AI Mythological Series",
            subtitle: "Legendary warriors and ancient epics reimagined in hyper-realistic AI visuals.",
            items: mahabharatSeries,
        },
    };

    const currentSeries = seriesMap[activeSeries] || seriesMap.all;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                    <Tv className="w-4 h-4" />
                    <span>Episodic Productions</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                    {currentSeries.title}
                </h1>
                <p className="text-zinc-400 text-sm md:text-base mt-1 max-w-2xl">
                    {currentSeries.subtitle}
                </p>

                {/* Series Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pt-6 pb-2">
                    {[
                        { key: "all", label: "All Series" },
                        { key: "kuku", label: "🦸 Kuku Boy Superhero" },
                        { key: "animation", label: "🎨 3D Animation" },
                        { key: "aifilm", label: "🚀 AI Sci-Fi Film" },
                        { key: "mahabharat", label: "🏹 Mahabharat AI" },
                    ].map((tab) => {
                        const active = activeSeries === tab.key;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveSeries(tab.key)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${
                                    active
                                        ? "bg-red-600 text-white shadow-red-600/30"
                                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10"
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <MovieGrid movies={currentSeries.items} />
        </div>
    );
}
