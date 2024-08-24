import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'

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
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignUpView />
        </Col>
      ) : selectedMovie ? (
    <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView
        style={{ border: "1px solid green" }}
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        </Col>
      ) : movies.length === 0 ? (
        <div>This list is empty</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard
              
              movie={movie}
              onMovieClick={handleMovieClick}
            />
            </Col>
          ))}

          <Button variant="primary" type="submit" onClick={handleLogout}>Logout</Button>
        </>
        
      )}
    </Row>
  );
};
