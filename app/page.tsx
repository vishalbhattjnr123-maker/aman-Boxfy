import { Hero } from "@/components/hero/Hero";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { OurTeam } from "@/components/team/OurTeam";
import { categorizedMovies } from "@/data/movies";
import Link from "next/link";
import { Sparkles, Flame, Users } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden pb-12">
            {/* Cinematic Hero */}
            <Hero />

            {/* Quick Category Jump Bar */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:pl-[100px] lg:pl-[120px] pr-4 sm:pr-8 -mt-8 md:-mt-12 mb-6">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 px-1">
                    {[
                        { label: "Trending", href: "/trending", icon: Flame },
                        { label: "Our Team", href: "#team", icon: Users },
                        { label: "3D Animation", href: "/categories#3d-animation-productions" },
                        { label: "AI Sci-Fi Films", href: "/categories#ai-cinematic-sci-fi-films" },
                        { label: "Kuku Boy Series", href: "/categories#kuku-boy-superhero-series" },
                        { label: "Mahabharat Epics", href: "/categories#mahabharat-ai-mythological" },
                        { label: "AR/VR & Gaming", href: "/categories#game-designing-&-ar/vr" },
                        { label: "Commercials", href: "/categories#ai-commercials-&-brand-ads" },
                        { label: "Music Videos", href: "/categories#ai-music-&-visualizers" },
                    ].map((tab, idx) => (
                        <Link
                            key={idx}
                            href={tab.href}
                            className="whitespace-nowrap px-4 py-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xs sm:text-sm font-semibold border border-white/10 hover:border-white/30 backdrop-blur-md transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                        >
                            {tab.icon && <tab.icon className="w-3.5 h-3.5 text-pink-500" />}
                            <span>{tab.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Carousel Movie Rows */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 relative z-20">
                {Object.entries(categorizedMovies).map(([title, movies]) => (
                    <div key={title} id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                        <MovieRow
                            title={title}
                            movies={movies}
                            seeAllHref={`/categories#${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        />
                    </div>
                ))}
            </div>

            {/* Our Team & Studio Section */}
            <div id="team" className="mt-8">
                <OurTeam />
            </div>
        </div>
    );
}
