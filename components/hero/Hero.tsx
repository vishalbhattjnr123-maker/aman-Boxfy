"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Info, Plus, Check, VolumeX, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { movies } from "@/data/movies";
import { getVideoType, normalizeVideoUrl, getYouTubeId } from "@/lib/video";
import { useUser } from "@/components/providers/UserProvider";

export const Hero = () => {
    // Curated high-impact hero slides across flagship categories
    const heroSlides = [
        movies[0],  // 3D Animation
        movies[12], // AI Film
        movies[31], // Kuku Boy Superhero
        movies[21], // AI Commercial
        movies[46], // Mahabharat AI
    ].filter(Boolean) as (typeof movies)[0][];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [imgError, setImgError] = useState(false);

    const { toggleMyList, isInMyList } = useUser();
    const activeSlide = heroSlides[currentIndex];
    const inList = activeSlide ? isInMyList(activeSlide.id) : false;

    // Reset video state on slide change, fade in after a brief pause
    useEffect(() => {
        setShowVideo(false);
        setImgError(false);
        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Auto-advance slide unless user is hovering
    useEffect(() => {
        if (isHovering) return;
        const autoPlayTimer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        }, 11000);
        return () => clearInterval(autoPlayTimer);
    }, [isHovering, heroSlides.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    if (!activeSlide) return null;

    const videoType = getVideoType(activeSlide.videoUrl || "");
    const videoId = getYouTubeId(activeSlide.videoUrl || "");
    const fallbackBackdrop = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/images/hero.jpg";
    const backdropSrc = imgError ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : (activeSlide.backdrop || fallbackBackdrop);

    const embedUrl = normalizeVideoUrl(activeSlide.videoUrl, videoType, {
        autoPlay: true,
        muted: isMuted,
        controls: false,
        loop: true,
        playsInline: true,
    });

    return (
        <div
            className="relative w-full h-[70vh] md:h-[86vh] min-h-[580px] max-h-[960px] flex items-center bg-black overflow-hidden group select-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Background Media Layer */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0 overflow-hidden"
                >
                    {/* High-res backdrop image */}
                    <Image
                        src={backdropSrc}
                        alt={activeSlide.title}
                        fill
                        priority
                        sizes="100vw"
                        onError={() => setImgError(true)}
                        className={`object-cover object-center transition-opacity duration-1000 ${
                            showVideo ? "opacity-0" : "opacity-100 scale-105 transition-transform duration-[10000ms]"
                        }`}
                    />

                    {/* Smooth background video playback */}
                    {showVideo && (
                        videoType === "youtube" ? (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <iframe
                                    key={`${currentIndex}-${isMuted}`}
                                    src={embedUrl}
                                    title={activeSlide.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    className="w-[125vw] h-[125vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.35] md:scale-[1.25] pointer-events-none border-0"
                                />
                            </div>
                        ) : (
                            <video
                                src={activeSlide.videoUrl}
                                autoPlay
                                muted={isMuted}
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover"
                            />
                        )
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Seamless Vignette & Gradients for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/75 to-transparent md:w-[65%] lg:w-[55%] z-10 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

            {/* Hero Main Content */}
            <div className="relative z-20 px-5 sm:px-8 md:pl-[100px] lg:pl-[120px] pr-6 w-full max-w-7xl mx-auto mt-12 md:mt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl lg:max-w-3xl"
                    >
                        {/* Tagline & Badges */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-[11px] sm:text-xs font-bold text-gray-300">
                            <span className="flex items-center gap-1.5 bg-red-600/90 text-white px-2.5 py-0.5 rounded shadow-md tracking-wider uppercase text-[10px] sm:text-xs font-black">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                BOXFY EXCLUSIVE
                            </span>
                            <span className="bg-white/15 px-2 py-0.5 rounded text-white backdrop-blur-md border border-white/20">
                                {activeSlide.quality || "4K ULTRA HD"}
                            </span>
                            <span className="text-green-400 font-bold">
                                {activeSlide.rating} Rating
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>{activeSlide.year}</span>
                            <span className="text-gray-400">•</span>
                            <span className="border border-white/30 px-1.5 py-0.2 rounded text-[10px]">
                                {activeSlide.duration}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 line-clamp-2 drop-shadow-2xl leading-[1.08]">
                            {activeSlide.title}
                        </h1>

                        {/* Description */}
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 line-clamp-3 max-w-2xl drop-shadow-md font-normal leading-relaxed">
                            {activeSlide.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <Link href={`/watch/${activeSlide.id}`}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2.5 bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-xl hover:shadow-white/20 text-sm sm:text-base cursor-pointer"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    <span>Play Now</span>
                                </button>
                            </Link>

                            <Link href={`/details/${activeSlide.id}`}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-white backdrop-blur-xl px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all active:scale-95 text-sm sm:text-base border border-white/15 hover:border-white/30 cursor-pointer shadow-lg"
                                >
                                    <Info className="w-5 h-5" />
                                    <span>More Info</span>
                                </button>
                            </Link>

                            <button
                                type="button"
                                onClick={() => toggleMyList(activeSlide.id)}
                                title={inList ? "In My List" : "Add to My List"}
                                className={`p-3 sm:p-3.5 rounded-xl transition-all active:scale-95 backdrop-blur-xl border shadow-lg flex items-center justify-center cursor-pointer ${
                                    inList
                                        ? "bg-red-600/30 text-red-400 border-red-500/50 hover:bg-red-600/40"
                                        : "bg-zinc-900/80 hover:bg-zinc-800 text-white border-white/15 hover:border-white/30"
                                }`}
                            >
                                {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Top-Right Sound & Slide Navigation */}
            <div className="absolute right-4 sm:right-8 md:right-12 bottom-20 md:bottom-24 z-30 flex items-center gap-3">
                {/* Audio Mute/Unmute toggle */}
                <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    title={isMuted ? "Unmute Preview" : "Mute Preview"}
                    className="flex items-center gap-2 px-3 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-white transition-all text-xs font-semibold shadow-lg cursor-pointer"
                >
                    {isMuted ? (
                        <>
                            <VolumeX className="w-4 h-4 text-zinc-400" />
                            <span className="hidden sm:inline">Audio Off</span>
                        </>
                    ) : (
                        <>
                            <Volume2 className="w-4 h-4 text-green-400" />
                            <span className="hidden sm:inline text-green-400">Audio On</span>
                        </>
                    )}
                </button>
            </div>

            {/* Left & Right Slide Controls */}
            <div className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 z-20 pointer-events-none flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="p-2.5 sm:p-3 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-white pointer-events-auto transition-transform hover:scale-110 shadow-xl cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="p-2.5 sm:p-3 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-white pointer-events-auto transition-transform hover:scale-110 shadow-xl cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {/* Bottom Slide Indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {heroSlides.map((slide, idx) => (
                    <button
                        key={slide.id || idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === currentIndex ? "w-8 bg-red-600 shadow-md shadow-red-600/50" : "w-3 bg-zinc-600 hover:bg-white"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
