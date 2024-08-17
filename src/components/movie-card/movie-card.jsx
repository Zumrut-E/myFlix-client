import PropTypes from "prop-types";
import { Card } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick}) => {
  return (
    <Card 
      onClick={() => onMovieClick(movie)} 
      variant="link" 
      className="h-100 shadow-sm movie-card"
      style={{ cursor: 'pointer', borderRadius: '10px', overflow: 'hidden' }}
    >
      <Card.Img 
        variant="top"  
        src={movie.image_url} 
        alt={movie.title} 
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{movie.title}</Card.Title>
        <Card.Text className="text-muted text-truncate">
          {movie.description}
        </Card.Text>
      </Card.Body>
    </Card>
     
  );
};
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }),
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth_year: PropTypes.number
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}