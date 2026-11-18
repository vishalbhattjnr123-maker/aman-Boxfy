import { Hero } from "@/components/hero/Hero";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { OurTeam } from "@/components/team/OurTeam";
import { categorizedMovies } from "@/data/movies";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden pb-12">
            {/* Cinematic Hero Slider with Glow Dot Indicators */}
            <Hero />

            {/* Futuristic Dot-Separated Category Navigation Ribbon */}
            <div className="relative z-30 -mt-8 sm:-mt-10 md:-mt-12 mb-3 sm:mb-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    {/* Minimalist dot-separated category ticker (no boxes/borders) */}
                    <div className="w-full overflow-x-auto no-scrollbar py-2">
                        <nav
                            aria-label="Quick Category Jump"
                            className="flex items-center justify-center min-w-max gap-3 sm:gap-4 md:gap-5 text-xs sm:text-sm font-medium tracking-wide text-zinc-400"
                        >
                            <a
                                href="#trending-now"
                                className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
                                <span className="text-white font-semibold group-hover:text-pink-400 transition-colors">Trending</span>
                            </a>

                            <span className="text-pink-500/80 font-bold select-none">•</span>

                            <a
                                href="#3d-animation-productions"
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                3D Animation
                            </a>

                            <span className="text-zinc-600 select-none">•</span>

                            <a
                                href="#ai-cinematic-sci-fi-films"
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                AI Cinema
                            </a>

                            <span className="text-zinc-600 select-none">•</span>

                            <a
                                href="#kuku-boy-superhero-series"
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Kuku Boy
                            </a>

                            <span className="text-zinc-600 select-none">•</span>

                            <a
                                href="#mahabharat-ai-mythological"
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Mahabharat AI
                            </a>

                            <span className="text-zinc-600 select-none">•</span>

                            <a
                                href="#game-designing-ar-vr"
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                AR/VR Gaming
                            </a>

                            <span className="text-zinc-600 select-none">•</span>

                            <a
                                href="#ai-commercials-brand-ads"
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Commercials
                            </a>

                            <span className="text-purple-400/80 font-bold select-none">•</span>

                            <a
                                href="#team"
                                className="flex items-center gap-1.5 hover:text-purple-300 text-purple-400 font-medium transition-colors cursor-pointer"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                                <span>Executive Team</span>
                            </a>
                        </nav>
                    </div>

                    {/* Subtle Futuristic Dotted Matrix Accent */}
                    <div className="flex items-center justify-center gap-2 mt-1.5 pt-2 border-t border-dotted border-white/10 w-full max-w-sm">
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899] animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_#6366f1]" />
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    </div>
                </div>
            </div>

            {/* Seamless Carousel Movie Rows */}
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
            <div id="team" className="mt-12">
                <OurTeam />
            </div>
        </div>
    );
}
