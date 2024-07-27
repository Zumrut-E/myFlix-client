import { useState } from "react"
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
    const [movies] =useState([
        {
          id: 1,
          title: "Inception",
          description: "A mind-bending thriller",
          genre: {
            name: "thriller",
            description: "Suspenseful movies"
          },
          director: {
            name: "Christopher Nolan",
            bio: "British-American film director",
          },
          image: "https://c7.alamy.com/comp/2JH2PW0/movie-poster-inception-2010-2JH2PW0.jpg",
          is_featured: true,
        },

         {
          id: 2,
          title: "Pulp Fiction",
          description: "Interwoven tales of crime",
          genre: {
            name: "drama",
            description: "Serious, narrative movies"
          },
          director: {
            name: "Quentin Tarantino",
            bio: "American film director",
          },
          image: "https://c7.alamy.com/comp/BY990P/pulp-fiction-year-1994-usa-director-quentin-tarantino-uma-thurman-BY990P.jpg",
          is_featured: true,
        },

         {
          id: 3,
          title: "Interstellar",
          description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
          genre: {
            name: "Sci-Fi",
            description: "Science-based depictions of phenomena"
          },
          director: {
            name: "Christopher Nolan",
            bio: "American film director",
          },
          image: "https://c7.alamy.com/comp/G5GGW3/filmplakat-zum-spielfilm-interstellar-berlin-G5GGW3.jpg",
          is_featured: true,
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    if (selectedMovie) {
        return(
            <MovieView movie={selectedMovie} onBackClick={()=>setSelectedMovie(null)}/>
        );
    }

    if(movies.length === 0) {
        return <div>This list is empty</div>;
    }

    return(
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick}/>
            ))}
        </div>
    )
}