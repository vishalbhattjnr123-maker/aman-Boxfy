"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Search,
    Film,
    Tv,
    TrendingUp,
    Grid,
    Plus,
    History,
    Settings,
    Menu,
    X,
    Sparkles,
    Users,
    Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Film, label: "Movies", href: "/movies" },
    { icon: Tv, label: "Series", href: "/series" },
    { icon: TrendingUp, label: "Trending", href: "/trending" },
    { icon: Grid, label: "Categories", href: "/categories" },
    { icon: Users, label: "Our Team", href: "/team" },
];

const libraryItems = [
    { icon: Plus, label: "My List", href: "/my-list" },
    { icon: History, label: "History", href: "/history" },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    const sidebarVariants = {
        expanded: { width: "240px" },
        collapsed: { width: "76px" },
    };

    return (
        <>
            {/* Mobile Top Header */}
            <div className="md:hidden fixed top-0 inset-x-0 z-40 px-4 py-2.5 flex items-center justify-between bg-black/90 backdrop-blur-xl border-b border-white/10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative h-9 w-32">
                        <Image
                            src="/images/boxfylogo-white.png"
                            alt="Boxfy AI Creative Morph"
                            fill
                            priority
                            className="object-contain object-left"
                        />
                    </div>
                </Link>
                <div className="flex items-center gap-2.5">
                    <a
                        href="tel:919115511252"
                        title="Call Boxfy Team"
                        className="p-2 text-pink-400 hover:text-white bg-pink-600/10 hover:bg-pink-600/20 rounded-lg border border-pink-500/20 transition-colors"
                    >
                        <Phone size={18} />
                    </a>
                    <Link href="/search" className="text-zinc-300 hover:text-white p-2">
                        <Search size={20} />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(true)}
                        aria-label="Open Menu"
                        className="text-white p-1.5 focus:outline-none cursor-pointer"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                            <div className="relative h-10 w-40">
                                <Image
                                    src="/images/boxfylogo-white.png"
                                    alt="Boxfy AI Creative Morph"
                                    fill
                                    priority
                                    className="object-contain object-left"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsMobileOpen(false)}
                                aria-label="Close Menu"
                                className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer"
                            >
                                <X size={26} />
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            <div>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest px-2 mb-3">
                                    Browse Platform
                                </p>
                                <div className="flex flex-col gap-1.5">
                                    {menuItems.map((item) => {
                                        const active = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 px-3 py-3 rounded-xl text-base font-semibold transition-all",
                                                    active
                                                        ? "text-white bg-pink-600/20 border border-pink-500/30"
                                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                <item.icon
                                                    size={22}
                                                    className={active ? "text-pink-500" : ""}
                                                />
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4">
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest px-2 mb-3">
                                    My Collection
                                </p>
                                <div className="flex flex-col gap-1.5">
                                    {libraryItems.map((item) => {
                                        const active = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 px-3 py-3 rounded-xl text-base font-semibold transition-all",
                                                    active
                                                        ? "text-white bg-white/10 border border-white/20"
                                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                <item.icon size={22} />
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Direct Studio Phone Call */}
                            <div className="border-t border-white/10 pt-4">
                                <a
                                    href="tel:919115511252"
                                    className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-2xl text-pink-400 hover:text-white font-bold text-sm"
                                >
                                    <Phone size={20} className="text-pink-500" />
                                    <span>Call: +91-9115511252</span>
                                </a>
                            </div>

                            <div className="mt-auto border-t border-white/10 pt-4">
                                <Link
                                    href="/settings"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex items-center gap-4 px-3 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 text-base font-semibold transition-all"
                                >
                                    <Settings size={22} />
                                    <span>Settings</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Collapsible Floating Sidebar */}
            <motion.aside
                initial="collapsed"
                animate={isCollapsed ? "collapsed" : "expanded"}
                variants={sidebarVariants}
                className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-black/95 backdrop-blur-2xl border-r border-white/10 z-40 transition-all duration-300 ease-in-out"
                onMouseEnter={() => setIsCollapsed(false)}
                onMouseLeave={() => setIsCollapsed(true)}
            >
                {/* Logo Branding */}
                <div className="flex items-center h-20 px-4 mb-4 mt-2">
                    <Link href="/" className="flex items-center overflow-hidden w-full">
                        {isCollapsed ? (
                            <div className="relative h-9 w-10 mx-auto">
                                <Image
                                    src="/images/boxfylogo-white.png"
                                    alt="Boxfy AI"
                                    fill
                                    priority
                                    className="object-contain object-left"
                                />
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative h-10 w-44"
                            >
                                <Image
                                    src="/images/boxfylogo-white.png"
                                    alt="Boxfy AI Creative Morph"
                                    fill
                                    priority
                                    className="object-contain object-left"
                                />
                            </motion.div>
                        )}
                    </Link>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col flex-1 gap-6 px-3.5 overflow-y-auto scrollbar-hide">
                    {/* Main Menu */}
                    <div className="flex flex-col gap-1.5">
                        {!isCollapsed && (
                            <p className="text-zinc-500 text-[10px] font-extrabold uppercase tracking-widest px-2 mb-1">
                                Menu
                            </p>
                        )}
                        {menuItems.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                        active
                                            ? "text-white bg-gradient-to-r from-pink-600/20 via-purple-600/15 to-transparent border border-pink-500/30 shadow-md shadow-pink-600/10"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    {active && (
                                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-pink-500 rounded-r-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                                    )}
                                    <item.icon
                                        size={20}
                                        className={cn(
                                            "shrink-0 transition-transform group-hover:scale-110",
                                            active ? "text-pink-500" : ""
                                        )}
                                    />
                                    {!isCollapsed && (
                                        <span className={cn("whitespace-nowrap text-sm font-semibold tracking-wide")}>
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Library Items */}
                    <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
                        {!isCollapsed && (
                            <p className="text-zinc-500 text-[10px] font-extrabold uppercase tracking-widest px-2 mb-1">
                                Library
                            </p>
                        )}
                        {libraryItems.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                        active
                                            ? "text-white bg-white/10 border border-white/15"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <item.icon
                                        size={20}
                                        className="shrink-0 transition-transform group-hover:scale-110"
                                    />
                                    {!isCollapsed && (
                                        <span className="whitespace-nowrap text-sm font-semibold tracking-wide">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Studio Contact Phone Call */}
                <div className="p-3.5 mt-auto border-t border-white/10 flex flex-col gap-2">
                    <a
                        href="tel:919115511252"
                        className={cn(
                            "flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all group bg-pink-600/10 hover:bg-pink-600/25 border border-pink-500/20 text-pink-400 hover:text-white",
                        )}
                        title={isCollapsed ? "+91-9115511252" : undefined}
                    >
                        <Phone size={19} className="shrink-0 text-pink-500" />
                        {!isCollapsed && (
                            <div className="overflow-hidden">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Call Studio</span>
                                <span className="text-xs font-bold text-white whitespace-nowrap">+91-9115511252</span>
                            </div>
                        )}
                    </a>

                    <Link
                        href="/settings"
                        className={cn(
                            "flex items-center gap-3.5 px-3 py-2 rounded-xl transition-all group",
                            pathname === "/settings"
                                ? "text-white bg-white/10 border border-white/20"
                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                        title={isCollapsed ? "Settings" : undefined}
                    >
                        <Settings size={20} className="shrink-0 group-hover:rotate-90 transition-transform duration-300" />
                        {!isCollapsed && (
                            <span className="text-sm font-semibold whitespace-nowrap">Settings</span>
                        )}
                    </Link>
                </div>
            </motion.aside>

            {/* Mobile Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center py-2.5 px-2">
                {[
                    { icon: Home, label: "Home", href: "/" },
                    { icon: Search, label: "Search", href: "/search" },
                    { icon: Users, label: "Team", href: "/team" },
                    { icon: TrendingUp, label: "Trending", href: "/trending" },
                    { icon: Plus, label: "My List", href: "/my-list" },
                ].map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors",
                                active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <item.icon
                                size={19}
                                className={active ? "text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" : ""}
                            />
                            <span className={cn("text-[10px] tracking-tight", active ? "font-bold text-white" : "font-medium")}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
