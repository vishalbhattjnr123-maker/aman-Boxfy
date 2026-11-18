"use client";

import Link from "next/link";
import { movies } from "@/data/movies";
import { MovieGrid } from "@/components/movie-grid/MovieGrid";
import { useUser } from "@/components/providers/UserProvider";
import { Plus, BookmarkCheck } from "lucide-react";

export default function MyListPage() {
    const { myList } = useUser();

    const userMovies = myList
        .map((id) => movies.find((m) => m.id === id))
        .filter(Boolean) as typeof movies;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Saved Watchlist</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                    My Watchlist
                </h1>
                <p className="text-zinc-400 text-sm md:text-base mt-1">
                    {userMovies.length > 0
                        ? `You have ${userMovies.length} title${userMovies.length === 1 ? "" : "s"} saved for later.`
                        : "Titles you save will appear here for easy streaming."}
                </p>
            </div>

            {userMovies.length > 0 ? (
                <div className="pb-16">
                    <MovieGrid movies={userMovies} />
                </div>
            ) : (
                <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] py-16 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-4 text-2xl">
                        🎬
                    </div>
                    <h3 className="text-xl font-bold mb-2">Your Watchlist is Empty</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        Explore our 3D animations, AI films, and web series, and click the &quot;+&quot; button on any title to save it here.
                    </p>
                    <Link href="/">
                        <button
                            type="button"
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-red-600/30 cursor-pointer"
                        >
                            Browse All Content
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
