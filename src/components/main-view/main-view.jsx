import { useEffect, useState } from "react"
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
    const [movies, setMovies] =useState([]);
    useEffect (() => {
      fetch("https://myflix2024-e1c9b1faca45.herokuapp.com/movies")
    .then((response) => response.json())
    .then((movies) => {
      const moviesFromApi = movies.map((movie) => {
        return {
          id: movie._id,
          title: movie.title,
          description: movie.description,
          image_url: movie.image_url,
          genre: movie.genre,
          director: movie.director
      };
      });
    
       setMovies(moviesFromApi);
    })
    .catch((error) => console.error("Error fetching movies:", error));
  }, []);

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
                <MovieCard 
                key={movie.id} 
                movie={movie} 
                onMovieClick={handleMovieClick}/>
            ))}
        </div>
    )
}