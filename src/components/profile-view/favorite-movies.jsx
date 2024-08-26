import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user, onUserUpdate }) => {
  return (
    <>
      <h3>Favorite Movies</h3>
      <Row>
        {movies.map(movie => (
          <Col md={4} key={movie._id} className="mb-3">
            <MovieCard movie={movie} user={user} onUserUpdate={onUserUpdate} />
          </Col>
        ))}
      </Row>
    </>
  );
};

