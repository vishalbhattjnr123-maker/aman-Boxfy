"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, Plus, Check, Share2, ThumbsUp, Sparkles } from "lucide-react";
import { VideoPlayer } from "@/components/video-player/VideoPlayer";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { movies } from "@/data/movies";
import { useEffect, useState } from "react";
import { useUser } from "@/components/providers/UserProvider";

export default function WatchPage() {
    const params = useParams();
    const router = useRouter();
    const { toggleMyList, isInMyList, addToHistory } = useUser();
    const [movie, setMovie] = useState<any>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (params.id) {
            const found = movies.find((m) => m.id === params.id);
            if (found) {
                setMovie(found);
                addToHistory(found.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }, [params.id]);

    const handleBack = () => {
        if (typeof window !== "undefined" && window.history.length > 2) {
            router.back();
        } else {
            router.push("/");
        }
    };

    const handleShare = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
                <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4" />
                <p className="text-zinc-400 font-semibold tracking-wider">Loading Player...</p>
            </div>
        );
    }

    // Related movies in the same category or adjacent items
    const relatedMovies = movies
        .filter((m) => m.id !== movie.id && (m.genre?.[0] === movie.genre?.[0] || m.title.split(" - ")[0] === movie.title.split(" - ")[0]))
        .slice(0, 10);
    const fallbackRelated = relatedMovies.length > 0 ? relatedMovies : movies.filter((m) => m.id !== movie.id).slice(0, 8);

    const inList = isInMyList(movie.id);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Cinematic Player Stage */}
            <div className="relative w-full aspect-video md:h-[78vh] md:aspect-auto bg-black max-h-[920px] shadow-2xl">
                {/* Floating Top Navigation Header */}
                <div className="absolute top-0 inset-x-0 p-4 md:p-6 flex justify-between items-center z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-2 text-white hover:text-white/80 transition pointer-events-auto bg-black/60 hover:bg-black/90 px-3.5 py-2 md:px-5 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-xl cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-bold text-xs md:text-sm">Back</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="bg-red-600 text-white text-[10px] md:text-xs font-black px-2.5 py-0.5 rounded shadow-md uppercase tracking-wider">
                            Now Playing
                        </span>
                        <span className="text-zinc-300 text-xs md:text-sm font-semibold tracking-wide hidden sm:block max-w-[280px] md:max-w-md truncate drop-shadow-md">
                            {movie.title}
                        </span>
                    </div>
                </div>

                {/* Video Player */}
                <div className="w-full h-full">
                    <VideoPlayer
                        url={movie.videoUrl}
                        poster={movie.backdrop || movie.poster}
                        title={movie.title}
                        autoPlay
                    />
                </div>
            </div>

            {/* Title & Metadata Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
                    {/* Left Column: Details */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-red-500 font-extrabold uppercase text-xs tracking-widest">
                                BOXFY CINEMATICS
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 text-xs sm:text-sm text-zinc-300 font-medium">
                            <span className="text-green-400 font-bold">{movie.rating} Match</span>
                            <span>•</span>
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span className="bg-zinc-800 border border-white/10 px-2 py-0.5 rounded text-white font-bold text-xs">
                                {movie.quality || "4K ULTRA HD"}
                            </span>
                            <span>•</span>
                            <span>{movie.duration}</span>
                            <span className="border border-zinc-600 px-1.5 py-0.2 rounded text-[11px] text-zinc-400">
                                U/A 7+
                            </span>
                        </div>

                        <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                            {movie.description}
                        </p>

                        {/* Interactive Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => toggleMyList(movie.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 cursor-pointer text-sm sm:text-base ${
                                    inList
                                        ? "bg-red-600 text-white hover:bg-red-700 shadow-red-600/30"
                                        : "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/20"
                                }`}
                            >
                                {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                <span>{inList ? "In My List" : "Add to My List"}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsLiked((prev) => !prev)}
                                title="Like"
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95 cursor-pointer text-sm border ${
                                    isLiked
                                        ? "bg-green-600/20 text-green-400 border-green-500/50"
                                        : "bg-zinc-800/80 hover:bg-zinc-700 text-white border-white/10"
                                }`}
                            >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{isLiked ? "Liked" : "Like"}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleShare}
                                title="Share"
                                className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold bg-zinc-800/80 hover:bg-zinc-700 text-white border border-white/10 transition-all shadow-lg active:scale-95 cursor-pointer text-sm relative"
                            >
                                <Share2 className="w-4 h-4" />
                                <span>{copied ? "Link Copied!" : "Share"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Meta details */}
                    <div className="lg:w-80 flex flex-col gap-4 text-xs sm:text-sm bg-zinc-900/60 border border-white/10 p-6 rounded-2xl h-fit">
                        <div>
                            <span className="text-zinc-500 uppercase tracking-wider text-[11px] font-bold block mb-1">
                                Category & Genres
                            </span>
                            <span className="text-white font-medium">
                                {movie.genre?.join(", ") || "Entertainment, Animation"}
                            </span>
                        </div>
                        <div>
                            <span className="text-zinc-500 uppercase tracking-wider text-[11px] font-bold block mb-1">
                                Audio & Subtitles
                            </span>
                            <span className="text-white font-medium">
                                {movie.language || "Original Audio, English, Hindi"}
                            </span>
                        </div>
                        <div>
                            <span className="text-zinc-500 uppercase tracking-wider text-[11px] font-bold block mb-1">
                                Production Studio
                            </span>
                            <span className="text-white font-medium">
                                Boxfy AI Studio & Morph
                            </span>
                        </div>
                        <div>
                            <span className="text-zinc-500 uppercase tracking-wider text-[11px] font-bold block mb-1">
                                Format & Quality
                            </span>
                            <span className="text-green-400 font-semibold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" /> 4K Ultra High Definition
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Up Next & More Like This Carousel */}
            <div className="mt-4 pb-16">
                <MovieRow
                    title="Up Next & More Like This"
                    movies={fallbackRelated}
                />
            </div>
        </div>
    );
}
