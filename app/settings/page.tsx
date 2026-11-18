"use client";

import { useState } from "react";
import { useUser } from "@/components/providers/UserProvider";
import { Settings, Shield, Sliders, Trash2, CheckCircle2, Sparkles, Monitor } from "lucide-react";

export default function SettingsPage() {
    const { myList, watchHistory, clearHistory, clearMyList } = useUser();

    const [autoplay, setAutoplay] = useState(true);
    const [highQuality, setHighQuality] = useState(true);
    const [cinemaGlow, setCinemaGlow] = useState(true);
    const [audioPreviews, setAudioPreviews] = useState(false);
    const [savedMsg, setSavedMsg] = useState("");

    const showSaveNotification = (text: string) => {
        setSavedMsg(text);
        setTimeout(() => setSavedMsg(""), 2500);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 pt-20 md:pt-24 pb-16 max-w-4xl">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                    <Settings className="w-4 h-4" />
                    <span>Preferences</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md mb-2">
                    Studio Settings
                </h1>
                <p className="text-zinc-400 text-sm md:text-base mb-8">
                    Manage your streaming playback, visual display quality, and personal library data.
                </p>

                {savedMsg && (
                    <div className="mb-6 p-4 bg-green-950/80 border border-green-500/40 rounded-xl text-green-300 text-sm flex items-center gap-2 shadow-lg animate-fade-in">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        <span>{savedMsg}</span>
                    </div>
                )}

                <div className="space-y-6">
                    {/* User Profile Card */}
                    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-white/10">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-red-600 to-amber-500 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg shadow-red-600/30 text-white">
                                S
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl sm:text-2xl font-bold">STREAMX Premium Member</h2>
                                    <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                        VIP
                                    </span>
                                </div>
                                <p className="text-zinc-400 text-sm mt-0.5">studio@boxfy.co.in</p>
                                <p className="text-zinc-500 text-xs mt-2 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                                    Unlimited 4K HDR Streaming & Digital AI Production Library
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                                    Saved in Watchlist
                                </span>
                                <span className="text-2xl font-bold text-white">
                                    {myList.length} <span className="text-xs text-zinc-500 font-normal">titles</span>
                                </span>
                            </div>
                            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                                    Recently Watched
                                </span>
                                <span className="text-2xl font-bold text-white">
                                    {watchHistory.length} <span className="text-xs text-zinc-500 font-normal">titles</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Playback & Visual Quality Settings */}
                    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 mb-5 flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-red-500" />
                            Playback & Cinema Controls
                        </h3>

                        <div className="space-y-4">
                            {/* Autoplay toggle */}
                            <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition">
                                <div>
                                    <h4 className="text-sm sm:text-base font-semibold text-white">
                                        Autoplay Video Previews
                                    </h4>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Play trailers and hero previews automatically when browsing
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAutoplay((prev) => !prev);
                                        showSaveNotification("Autoplay preference updated!");
                                    }}
                                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                                        autoplay ? "bg-red-600" : "bg-zinc-700"
                                    }`}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                            autoplay ? "right-1" : "left-1"
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* 4K Ultra HD Streaming */}
                            <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition">
                                <div>
                                    <h4 className="text-sm sm:text-base font-semibold text-white">
                                        4K Ultra High Definition Streaming
                                    </h4>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Always prioritize maximum resolution (4K 2160p & HDR)
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setHighQuality((prev) => !prev);
                                        showSaveNotification("Stream quality preference updated!");
                                    }}
                                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                                        highQuality ? "bg-red-600" : "bg-zinc-700"
                                    }`}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                            highQuality ? "right-1" : "left-1"
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Ambient Glow */}
                            <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition">
                                <div>
                                    <h4 className="text-sm sm:text-base font-semibold text-white">
                                        Ambient Cinema Back-Glow
                                    </h4>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Cast dynamic atmospheric lighting behind the video player
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCinemaGlow((prev) => !prev);
                                        showSaveNotification("Cinema backlight glow preference updated!");
                                    }}
                                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                                        cinemaGlow ? "bg-red-600" : "bg-zinc-700"
                                    }`}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                            cinemaGlow ? "right-1" : "left-1"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 mb-5 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-500" />
                            Data & Storage Controls
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm("Clear all items from your Watch History?")) {
                                        clearHistory();
                                        showSaveNotification("Watch history cleared successfully!");
                                    }
                                }}
                                disabled={watchHistory.length === 0}
                                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-black/50 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl text-xs sm:text-sm font-semibold transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Clear Watch History ({watchHistory.length})</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm("Remove all saved movies from your Watchlist?")) {
                                        clearMyList();
                                        showSaveNotification("Watchlist cleared successfully!");
                                    }
                                }}
                                disabled={myList.length === 0}
                                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-black/50 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl text-xs sm:text-sm font-semibold transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Clear Watchlist ({myList.length})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
