import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix2024-e1c9b1faca45.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            image_url: movie.image_url,
            genre: movie.genre,
            director: movie.director,
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

  return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={ handleLogout }/>

   
      <Row className="justify-content-md-center">
        <Routes>
          <Route
        path="/signup"
        element={
          <>
       {user ? (
          <Navigate to="/" />
       ) : (
        <Col md={5}>
          <SignUpView />
 </Col>
       )}
       </>

      }
    />

        <Route
        path="/login"
        element={
          <>
          {user ? (
            <Navigate to="/" />
          ) : (
           <Col md={5}>
              <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          </Col>
          )}
          </>
        }
        />

<Route
  path="/movies/:movieId"
  element= {
   <>
   {!user ? (
    <Navigate to="/login" replace />
   ) : movies.length === 0 ? (
        <Col>This list is empty</Col>
      ) : (
        <Col md={8}>
          <MovieView movies={movies} />
        </Col>
   )}
    </>
  }
  />
        
       
       <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

      </Routes>
    </Row>
     </BrowserRouter>
  );
};
