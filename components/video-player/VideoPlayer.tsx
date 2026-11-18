"use client";

import { useEffect, useRef, useState } from "react";
import { getVideoType, isDirectVideo, isIframeVideo, normalizeVideoUrl, getYouTubeId, getVideoPoster } from "@/lib/video";
import { Play, Maximize2, RotateCcw, ExternalLink } from "lucide-react";

interface VideoPlayerProps {
    url: string;
    poster?: string;
    title?: string;
    autoPlay?: boolean;
    showCinemaGlow?: boolean;
}

export const VideoPlayer = ({
    url,
    poster,
    title,
    autoPlay = true,
    showCinemaGlow = true,
}: VideoPlayerProps) => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [origin, setOrigin] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
    }, []);

    const type = getVideoType(url);
    const fallbackPoster = poster || getVideoPoster({ poster, videoUrl: url });

    const normalizedUrl = normalizeVideoUrl(url, type, {
        autoPlay,
        muted: false,
        controls: true,
        playsInline: true,
        origin,
    });

    useEffect(() => {
        setIsLoading(true);
        setError(false);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [url]);

    const handleFullScreen = () => {
        if (!containerRef.current) return;
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        } else {
            containerRef.current.requestFullscreen().catch(() => {});
        }
    };

    if (!url) {
        return (
            <div className="w-full h-full min-h-[360px] bg-zinc-950 flex flex-col items-center justify-center text-white p-6 rounded-2xl border border-white/10">
                <p className="text-zinc-400 font-medium">Video source not found</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative w-full h-full min-h-[400px] bg-zinc-950 flex flex-col items-center justify-center text-white p-6 rounded-2xl border border-white/10 overflow-hidden text-center">
                {fallbackPoster && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={fallbackPoster}
                        alt={title || "Poster"}
                        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm -z-10"
                    />
                )}
                <div className="z-10 max-w-md">
                    <div className="w-14 h-14 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                        <RotateCcw className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Video Protected / External Playback Required</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        This video source restricts inline embedding or requires external stream authorization.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setError(false)}
                            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition border border-white/10 cursor-pointer"
                        >
                            Retry Player
                        </button>
                        {url.startsWith("http") && (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition shadow-lg"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>Watch on External Stream</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden select-none group rounded-2xl"
        >
            {/* Ambient Cinematic Back-Glow */}
            {showCinemaGlow && (
                <div className="absolute inset-0 -z-10 pointer-events-none opacity-40 blur-3xl bg-gradient-to-tr from-pink-600/30 via-purple-600/20 to-indigo-500/20 scale-110" />
            )}

            {/* Direct MP4 / WebM / HLS Video Element */}
            {isDirectVideo(type) && (
                <div className="relative w-full h-full">
                    <video
                        ref={videoRef}
                        src={normalizedUrl}
                        poster={fallbackPoster}
                        controls
                        playsInline
                        preload="metadata"
                        autoPlay={autoPlay}
                        onError={() => setError(true)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="w-full h-full object-contain"
                    />

                    {/* Direct Play/Pause Button overlay */}
                    {!isPlaying && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                            onClick={() => {
                                if (videoRef.current) {
                                    videoRef.current.play();
                                    setIsPlaying(true);
                                }
                            }}
                        >
                            <div className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                                <Play className="w-9 h-9 fill-current ml-1" />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Iframe YouTube / Vimeo / Drive / Embed Video Element */}
            {(isIframeVideo(type) || type === "unknown") && (
                <div className="relative w-full h-full aspect-video flex items-center justify-center bg-black">
                    {isLoading && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90">
                            <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-3" />
                            <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">
                                Loading Cinematic Stream...
                            </span>
                        </div>
                    )}

                    <iframe
                        src={normalizedUrl}
                        title={title || "Video Player"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full border-0 absolute inset-0"
                        onLoad={() => setIsLoading(false)}
                        onError={() => setError(true)}
                    />
                </div>
            )}

            {/* Top Info Strip (Visible on hover) */}
            {title && (
                <div className="absolute top-0 inset-x-0 p-4 md:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between z-30">
                    <div className="flex items-center gap-3">
                        <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                            BOXFY 4K
                        </span>
                        <h2 className="text-white text-sm md:text-base font-bold drop-shadow-md truncate max-w-md">
                            {title}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button
                            type="button"
                            onClick={handleFullScreen}
                            title="Fullscreen"
                            className="p-2 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-lg text-white border border-white/20 transition-transform hover:scale-105 cursor-pointer"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
