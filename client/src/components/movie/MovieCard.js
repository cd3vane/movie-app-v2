import React from 'react';
import Button from '../layout/Button';
import { MovieControls } from './MovieControls';

const MovieCard = ({ movie, type }) => {
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  return (
    <div className='column'>
      <div className='overlay'></div>
      <div className='content'>
        <img
          src={`${IMGPATH}${movie.poster_path}`}
          alt='No image in database'
        />
        {movie.poster_path != null ? (
          <Button text='+' name='watchlist-btn' />
        ) : (
          ''
        )}
      </div>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
