"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Phone, MessageCircle, Mail, MapPin, Heart } from "lucide-react";

export const Footer = () => {
    const phoneNumber = "+91-9115511252";
    const rawPhone = "919115511252";

    return (
        <footer className="w-full bg-zinc-950/90 border-t border-white/10 mt-20 pt-14 pb-24 md:pb-14 px-4 sm:px-6 md:px-12 text-zinc-400 text-sm">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand column */}
                    <div>
                        <div className="relative h-11 w-44 mb-4">
                            <Image
                                src="/images/boxfylogo-white.png"
                                alt="Boxfy AI Creative Morph"
                                fill
                                priority
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                            Premium international digital entertainment, 3D character animation, and AI cinematic film production studio.
                        </p>
                        <div className="flex flex-col gap-2 text-xs">
                            <a
                                href={`tel:${rawPhone}`}
                                className="flex items-center gap-2 text-pink-400 hover:text-white font-bold transition-colors"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{phoneNumber}</span>
                            </a>
                            <a
                                href={`https://wa.me/${rawPhone}?text=${encodeURIComponent("Hello Boxfy AI Studio! I want to collaborate.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-green-400 hover:text-white font-semibold transition-colors"
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp: {phoneNumber}</span>
                            </a>
                            <span className="flex items-center gap-2 text-zinc-400">
                                <Mail className="w-3.5 h-3.5 text-purple-400" />
                                <span>hello@boxfy.co.in</span>
                            </span>
                            <span className="flex items-center gap-2 text-zinc-400">
                                <MapPin className="w-3.5 h-3.5 text-pink-500" />
                                <span>Chandigarh, India</span>
                            </span>
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
                                <Link href="/team" className="hover:text-pink-400 font-bold transition-colors flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-pink-500" />
                                    <span>Our Creative Team</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/movies" className="hover:text-white transition-colors">
                                    All Movies & Videos
                                </Link>
                            </li>
                            <li>
                                <Link href="/series" className="hover:text-white transition-colors">
                                    Web Series & Seasons
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="hover:text-white transition-colors">
                                    Trending Top 20
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-white transition-colors">
                                    Genres & Categories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Flagship Series */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Flagship Series
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/categories#3d-animation-productions" className="hover:text-white transition-colors">
                                    3D Animation Productions
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#kuku-boy-superhero-series" className="hover:text-white transition-colors">
                                    Kuku Boy Superhero Series
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#ai-cinematic-sci-fi-films" className="hover:text-white transition-colors">
                                    AI Cinematic Sci-Fi Films
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#mahabharat-ai-mythological" className="hover:text-white transition-colors">
                                    Mahabharat AI Epics
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories#ai-commercials-&-brand-ads" className="hover:text-white transition-colors">
                                    AI Brand Commercials
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Studio Desk */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Studio Desk & Inquiries
                        </h4>
                        <p className="text-xs text-zinc-400 mb-3">
                            Direct production desk for international animation and AI commercial commissions.
                        </p>
                        <a
                            href={`tel:${rawPhone}`}
                            className="block w-full py-2.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-center text-xs font-bold transition shadow-lg shadow-pink-600/20 mb-3"
                        >
                            Call Studio: {phoneNumber}
                        </a>
                        <ul className="space-y-2 text-xs">
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
                                <Link href="/settings" className="hover:text-white transition-colors">
                                    Streaming Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© 2026 Boxfy AI Studio • AI Creative Morph. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href={`tel:${rawPhone}`} className="text-pink-400 hover:underline">{phoneNumber}</a>
                        <Link href="/team" className="hover:text-zinc-300 transition-colors">Team</Link>
                        <Link href="/settings" className="hover:text-zinc-300 transition-colors">Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
