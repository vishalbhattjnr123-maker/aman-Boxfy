"use client";

import Link from "next/link";
import { movies } from "@/data/movies";
import { MovieGrid } from "@/components/movie-grid/MovieGrid";
import { useUser } from "@/components/providers/UserProvider";
import { History, Trash2 } from "lucide-react";

export default function HistoryPage() {
    const { watchHistory, clearHistory } = useUser();

    // Map IDs back to movie objects in order of viewing
    const historyMovies = watchHistory
        .map((id) => movies.find((m) => m.id === id))
        .filter(Boolean) as typeof movies;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                            <History className="w-4 h-4" />
                            <span>Playback Log</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                            Watch History
                        </h1>
                        <p className="text-zinc-400 text-sm md:text-base mt-1">
                            {historyMovies.length > 0
                                ? `Showing your recently streamed titles (${historyMovies.length}).`
                                : "Titles you play will automatically appear here."}
                        </p>
                    </div>

                    {historyMovies.length > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                if (confirm("Clear your entire watch history?")) {
                                    clearHistory();
                                }
                            }}
                            className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-zinc-900 hover:bg-red-600/20 text-zinc-400 hover:text-red-400 rounded-xl text-xs sm:text-sm font-semibold border border-white/10 hover:border-red-500/30 transition-all cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Clear History</span>
                        </button>
                    )}
                </div>
            </div>

            {historyMovies.length > 0 ? (
                <div className="pb-16">
                    <MovieGrid movies={historyMovies} />
                </div>
            ) : (
                <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] py-16 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-4 text-2xl">
                        ⏱️
                    </div>
                    <h3 className="text-xl font-bold mb-2">No Watch History Yet</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        Start watching any movie or episode, and it will be remembered here so you can pick up right where you left off.
                    </p>
                    <Link href="/">
                        <button
                            type="button"
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-red-600/30 cursor-pointer"
                        >
                            Start Streaming
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
