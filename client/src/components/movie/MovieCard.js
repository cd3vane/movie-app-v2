import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../layout/Button';

const MovieCard = ({ movie }) => {
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  return (
    <Fragment>
      <div className='content'>
        <img
          src={`${IMGPATH}${movie.poster_path}`}
          alt='No image in database'
        />
      </div>

      <h5>{movie.title}</h5>
    </Fragment>
  );
};

export default MovieCard;
