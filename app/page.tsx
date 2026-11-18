import { Hero } from "@/components/hero/Hero";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { OurTeam } from "@/components/team/OurTeam";
import { categorizedMovies } from "@/data/movies";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden pb-16 bg-[#0a0a0a]">
            {/* Cinematic Hero Slider with Glowing Slide Indicators */}
            <Hero />

            {/* Seamless Movie Rows */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 relative z-20 pt-4 sm:pt-6 md:pt-8">
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

            {/* Studio Leadership & Executive Team Section */}
            <div id="team" className="mt-12 sm:mt-16">
                <OurTeam />
            </div>
        </div>
    );
}
