import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const MovieRow = ({ movie }) => {
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  return (
    <Fragment>
      <Link to={`/movie-details/${movie.id}`}>
        <div className='PicWrapper'>
          <img src={`${IMGPATH}/${movie.poster_path}`} alt={movie.id} />
          <div className='overlay'>
            <span>{movie.title}</span>
          </div>
        </div>
      </Link>
      <div>{movie.releaseDate}</div>
      <div>{movie.genre}</div>
      <div>{movie.productionCompany}</div>
      <div>{movie.rating}</div>
    </Fragment>
  );
};

export default MovieRow;
