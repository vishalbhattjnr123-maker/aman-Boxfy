"use client";

import Link from "next/link";
import { Film, Sparkles, Heart } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-zinc-950/80 border-t border-white/10 mt-20 pt-14 pb-24 md:pb-14 px-6 md:px-12 text-zinc-400 text-sm">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand column */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-white font-black text-2xl tracking-tighter">
                                STREAM<span className="text-red-600">X</span>
                            </span>
                            <span className="text-[10px] bg-red-600/20 text-red-400 font-bold px-1.5 py-0.5 rounded border border-red-500/30">
                                4K
                            </span>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                            Premium AI & 3D cinematic entertainment studio. Streaming next-generation AI films, 3D animations, and immersive superhero storytelling.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Sparkles className="w-3.5 h-3.5 text-red-500" />
                            <span>Powered by Boxfy AI Studio</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Explore
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home Showcase
                                </Link>
                            </li>
                            <li>
                                <Link href="/movies" className="hover:text-white transition-colors">
                                    All Movies & Videos
                                </Link>
                            </li>
                            <li>
                                <Link href="/series" className="hover:text-white transition-colors">
                                    Web Series & Episodes
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="hover:text-white transition-colors">
                                    Trending Releases
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-white transition-colors">
                                    Genres & Categories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Featured Categories */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Flagship Series
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/categories#3d-animation-videos" className="hover:text-white transition-colors">
                                    3D Animation Productions
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#kuku-boy-videos" className="hover:text-white transition-colors">
                                    Kuku Boy Superhero Series
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#ai-film-videos" className="hover:text-white transition-colors">
                                    AI Cinematic Sci-Fi Films
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#mahabharat-ai-videos" className="hover:text-white transition-colors">
                                    Mahabharat AI Epics
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#ai-ads-videos" className="hover:text-white transition-colors">
                                    AI Brand Commercials
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account & Library */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Personal Studio
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/my-list" className="hover:text-white transition-colors">
                                    My Watchlist
                                </Link>
                            </li>
                            <li>
                                <Link href="/history" className="hover:text-white transition-colors">
                                    Watch History
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="hover:text-white transition-colors">
                                    Smart Search
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings" className="hover:text-white transition-colors">
                                    Playback & Stream Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© 2026 STREAMX • Boxfy AI Studio. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/settings" className="hover:text-zinc-300 transition-colors">Privacy</Link>
                        <Link href="/settings" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
                        <Link href="/settings" className="hover:text-zinc-300 transition-colors">Help Center</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
