import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MovieRow from './MovieRow';

const MovieTable = ({ movies }) => {
  return (
    <div className='movie-table'>
      <Fragment>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className='column'>
              <Link to={`/movie-details/${movie.id}`}>
                <MovieRow key={movie.id} movie={movie} />
              </Link>
            </div>
          ))
        ) : (
          <Fragment>
            <h4>
              No movies found, try searching for something or refreshing the
              page
            </h4>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default MovieTable;
