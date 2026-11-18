"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, Plus, Check, Share2, ThumbsUp, Sparkles, Film } from "lucide-react";
import { movies } from "@/data/movies";
import { useUser } from "@/components/providers/UserProvider";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { useState } from "react";
import { getVideoPoster } from "@/lib/video";

export default function DetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { toggleMyList, isInMyList } = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    const [imgError, setImgError] = useState(false);

    const movie = movies.find((m) => m.id === params.id);

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
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white px-4">
                <div className="text-center max-w-md bg-zinc-900 border border-white/10 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-3">Content Not Found</h2>
                    <p className="text-zinc-400 text-sm mb-6">The requested title is not available in the library.</p>
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
                    >
                        Browse Home
                    </button>
                </div>
            </div>
        );
    }

    const inList = isInMyList(movie.id);
    const fallbackImage = getVideoPoster(movie);
    const backdropSrc = imgError ? fallbackImage : (movie.backdrop || movie.poster || fallbackImage);

    // Related content
    const relatedMovies = movies
        .filter((m) => m.id !== movie.id && (m.genre?.[0] === movie.genre?.[0] || m.title.split(" - ")[0] === movie.title.split(" - ")[0]))
        .slice(0, 10);
    const fallbackRelated = relatedMovies.length > 0 ? relatedMovies : movies.filter((m) => m.id !== movie.id).slice(0, 8);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">
            {/* Top Back Navigation */}
            <div className="absolute top-0 inset-x-0 p-4 sm:p-6 z-40 flex items-center justify-between pointer-events-none">
                <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-white hover:text-white/80 transition pointer-events-auto bg-black/60 hover:bg-black/90 px-3.5 py-2 md:px-5 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-xl cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-bold text-xs md:text-sm">Back</span>
                </button>

                <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="bg-red-600 text-white text-[10px] md:text-xs font-black px-2.5 py-0.5 rounded shadow uppercase">
                        Boxfy Originals
                    </span>
                </div>
            </div>

            {/* Hero Backdrop Visual */}
            <div className="relative w-full h-[52vh] sm:h-[62vh] md:h-[72vh] max-h-[800px] overflow-hidden bg-black">
                <Image
                    src={backdropSrc}
                    alt={movie.title}
                    fill
                    priority
                    sizes="100vw"
                    onError={() => setImgError(true)}
                    className="object-cover object-center"
                />

                {/* Seamless Multi-Stop Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent md:w-3/4 z-10" />
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />
            </div>

            {/* Main Content Body */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 -mt-36 sm:-mt-48 md:-mt-64 pb-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
                    {/* Left Info Column */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-red-600/90 text-white px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-black tracking-wider uppercase">
                                STREAMX EXCLUSIVE
                            </span>
                            <span className="text-zinc-400 text-xs font-medium">•</span>
                            <span className="text-zinc-300 text-xs font-bold uppercase tracking-wide">
                                4K Cinematic Release
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-2xl leading-[1.1]">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 text-xs sm:text-sm text-zinc-300 font-semibold">
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

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                            <Link href={`/watch/${movie.id}`}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 bg-white text-black px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-xl hover:shadow-white/20 text-sm sm:text-base cursor-pointer"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    <span>Watch Movie</span>
                                </button>
                            </Link>

                            <button
                                type="button"
                                onClick={() => toggleMyList(movie.id)}
                                className={`flex items-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 cursor-pointer text-sm sm:text-base ${
                                    inList
                                        ? "bg-red-600 text-white hover:bg-red-700 shadow-red-600/30"
                                        : "bg-zinc-800/90 hover:bg-zinc-700 text-white border border-white/20"
                                }`}
                            >
                                {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                <span>{inList ? "In My List" : "Add to My List"}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsLiked((prev) => !prev)}
                                title="Like this title"
                                className={`p-3 sm:p-3.5 rounded-xl transition-all active:scale-95 shadow-lg border cursor-pointer ${
                                    isLiked
                                        ? "bg-green-600/20 text-green-400 border-green-500/50"
                                        : "bg-zinc-800/80 hover:bg-zinc-700 text-white border-white/10"
                                }`}
                            >
                                <ThumbsUp className="w-5 h-5" />
                            </button>

                            <button
                                type="button"
                                onClick={handleShare}
                                title="Share title link"
                                className="p-3 sm:p-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-white border border-white/10 transition-all shadow-lg active:scale-95 cursor-pointer relative"
                            >
                                <Share2 className="w-5 h-5" />
                                {copied && (
                                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                        Copied!
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Synopsis */}
                        <div className="mb-8">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                                Overview & Synopsis
                            </h3>
                            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
                                {movie.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Metadata Column */}
                    <div className="lg:w-80 flex flex-col gap-4 text-xs sm:text-sm bg-zinc-900/60 border border-white/10 p-6 rounded-2xl h-fit">
                        <div>
                            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px] block mb-1">
                                Genres
                            </span>
                            <span className="text-white font-medium">
                                {movie.genre?.join(", ") || "Entertainment"}
                            </span>
                        </div>
                        <div>
                            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px] block mb-1">
                                Audio & Dubbing
                            </span>
                            <span className="text-white font-medium">
                                {movie.language || "Original Audio, English, Hindi"}
                            </span>
                        </div>
                        <div>
                            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px] block mb-1">
                                Creator & Studio
                            </span>
                            <span className="text-white font-medium">
                                Boxfy AI Studio Production
                            </span>
                        </div>
                        <div>
                            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[11px] block mb-1">
                                Visual Quality
                            </span>
                            <span className="text-green-400 font-semibold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" /> 4K Ultra HD • HDR 10+
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* More Like This Row */}
            <div className="pb-16">
                <MovieRow
                    title="More Like This"
                    movies={fallbackRelated}
                />
            </div>
        </div>
    );
}
