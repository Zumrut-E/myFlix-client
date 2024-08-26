import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, isFavorite, onFavoriteToggle }) => {
  const [isFav, setIsFav] = useState(isFavorite);

  // Sync the local isFav state with the isFavorite prop whenever isFavorite changes
  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const handleFavoriteClick = () => {
    // Toggle the local state first
    setIsFav((prev) => !prev);
    // Notify the parent component to update the favorite status
    onFavoriteToggle(movie.id, !isFav);
  };

  return (
    <Card>
      <Card.Img variant="top" src={movie.image_url} alt={movie.title} />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{movie.title}</Card.Title>
        <Card.Text className="text-muted text-truncate">
          {movie.description}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>

        <Button
          variant={isFav ? "danger" : "secondary"}
          onClick={handleFavoriteClick}
          className="mt-2"
        >
          {isFav ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth_year: PropTypes.number,
    }),
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
