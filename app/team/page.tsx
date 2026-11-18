"use client";

import { OurTeam } from "@/components/team/OurTeam";
import { MovieRow } from "@/components/movie-row/MovieRow";
import { movies } from "@/data/movies";

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-12 md:pt-16">
            <OurTeam />

            {/* Showcase from our creators */}
            <div className="pb-16 -mt-8">
                <MovieRow
                    title="🎬 Flagship Productions & Original Releases"
                    movies={[movies[0], movies[12], movies[31], movies[46], movies[7], movies[21]]}
                />
            </div>
        </div>
    );
}
