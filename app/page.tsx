import { Hero } from "@/components/hero/Hero";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { OurTeam } from "@/components/team/OurTeam";
import { categorizedMovies } from "@/data/movies";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden pb-12">
            {/* Cinematic Hero */}
            <Hero />

            {/* Seamless Carousel Movie Rows */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 -mt-16 sm:-mt-20 md:-mt-28 relative z-20">
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
