import { useEffect, useState } from "react"
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignUpView} from "../signup-view/signup-view";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
    
    const [movies, setMovies] =useState([]);
    const [selectedMovie, setSelectedMovie]  = useState(null); 
    const [user, setUser] = useState(storedUser || null);
    const [token, setToken] = useState(storedToken || null);


    useEffect (() => {
        if(!token) {
            return;
        }

      fetch("https://myflix2024-e1c9b1faca45.herokuapp.com/movies", {
         headers: { Authorization: `Bearer ${token}` },
      })

    .then((response) => response.json())
    .then((movies) => {
      const moviesFromApi = movies.docs.map((movie) => {
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
  }, [token]);


    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

     if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
       <div style={{ margin: "20px 0" }}>or</div>
        <SignUpView />
      </>
    );
  }

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
                onMovieClick={handleMovieClick}
                />
            ))}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};