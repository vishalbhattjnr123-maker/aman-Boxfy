"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, Plus, Info, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "@/components/providers/UserProvider";
import { getYouTubeId } from "@/lib/video";

export interface Movie {
    id: string;
    title: string;
    poster: string;
    backdrop: string;
    year: number;
    duration: string;
    rating: string;
    genre: string[];
    quality: string;
    description?: string;
    videoUrl?: string;
}

interface MovieCardProps {
    movie: Movie;
    priority?: boolean;
}

export const MovieCard = ({ movie, priority = false }: MovieCardProps) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);
    const { toggleMyList, isInMyList } = useUser();
    const inList = isInMyList(movie.id);

    const videoId = getYouTubeId(movie.videoUrl || "");
    const fallbackImage = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "/images/placeholder.jpg";
    const imageSrc = imgError ? fallbackImage : (movie.backdrop || movie.poster || fallbackImage);

    const handleCardClick = (e: React.MouseEvent) => {
        // Navigate to details if not clicking an action button
        router.push(`/details/${movie.id}`);
    };

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/watch/${movie.id}`);
    };

    const handleListClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMyList(movie.id);
    };

    const handleInfoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/details/${movie.id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group w-full aspect-video rounded-xl bg-zinc-950 flex-shrink-0 cursor-pointer overflow-hidden shadow-lg border border-white/5 hover:border-red-600/40 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300"
        >
            {/* Poster / Backdrop Image */}
            <Image
                src={imageSrc}
                alt={movie.title}
                fill
                priority={priority}
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 300px, 350px"
                onError={() => setImgError(true)}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Permanent Subtle Bottom Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Quality Tag at Top Right */}
            <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                <span className="bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                    {movie.quality || "4K"}
                </span>
            </div>

            {/* Always visible title for mobile & default view */}
            <div className={`absolute bottom-0 inset-x-0 p-3 pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-0 md:opacity-0" : "opacity-100"}`}>
                <h3 className="text-white text-xs sm:text-sm font-semibold truncate drop-shadow-md">
                    {movie.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-gray-300 mt-0.5 font-medium">
                    <span className="text-red-500 font-bold">{movie.rating} Match</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                </div>
            </div>

            {/* Desktop Full Hover Card Overlay */}
            <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent flex flex-col justify-end p-3.5 transition-opacity duration-300 z-20 ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="transform transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
                    <h3 className="text-white font-bold text-sm lg:text-base leading-snug line-clamp-1 drop-shadow-md mb-1.5">
                        {movie.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-[11px] font-semibold text-gray-300 mb-3">
                        <span className="text-red-500 font-bold">{movie.rating} Match</span>
                        <span>{movie.year}</span>
                        <span className="border border-gray-600 px-1 py-0.2 rounded text-[10px] text-gray-300">
                            {movie.duration}
                        </span>
                        {movie.genre?.[0] && (
                            <span className="text-gray-400 truncate max-w-[80px]">
                                {movie.genre[0]}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handlePlayClick}
                            title="Play Video"
                            className="bg-white hover:bg-gray-200 text-black p-2 rounded-full transition-transform active:scale-95 hover:scale-110 shadow-lg flex items-center justify-center cursor-pointer"
                        >
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                        </button>

                        <button
                            type="button"
                            onClick={handleListClick}
                            title={inList ? "Remove from My List" : "Add to My List"}
                            className="bg-zinc-800/90 hover:bg-zinc-700 text-white p-2 rounded-full border border-white/20 hover:border-white transition-all active:scale-95 hover:scale-110 shadow-lg flex items-center justify-center cursor-pointer"
                        >
                            {inList ? <Check className="w-4 h-4 text-green-400" /> : <Plus className="w-4 h-4" />}
                        </button>

                        <button
                            type="button"
                            onClick={handleInfoClick}
                            title="More Info"
                            className="bg-zinc-800/90 hover:bg-zinc-700 text-white p-2 rounded-full border border-white/20 hover:border-white transition-all active:scale-95 hover:scale-110 shadow-lg flex items-center justify-center ml-auto cursor-pointer"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
