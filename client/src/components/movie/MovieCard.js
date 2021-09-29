import React, { Fragment } from 'react';

const MovieCard = ({ movie, isPreview }) => {
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  return (
    <Fragment>
      <div className='content'>
        <img src={`${IMGPATH}${movie.poster_path}`} alt='Poster not found' />

        <h5>{movie.title}</h5>
      </div>
    </Fragment>
  );
};

export default MovieCard;
