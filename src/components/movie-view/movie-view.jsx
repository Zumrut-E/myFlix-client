import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) {
    return null; // or you can return a loading state or a message
  }

  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
       <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span><div>
        <span>{movie.genre.description}</span>
      </div>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
         <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Feature: </span>
        <span>{movie.isFeatured}</span>
      </div>
       <button onClick={onBackClick}>Back</button>
    </div>
  );
};