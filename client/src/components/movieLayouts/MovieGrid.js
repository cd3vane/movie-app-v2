import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../movie/MovieCard';

const MovieGrid = ({ movies }) => {
  return (
    <div className='row'>
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <div key={index} className='column'>
            <Link to={`/movie-details/${movie.id}`}>
              <MovieCard key={movie.id} movie={movie} />
            </Link>
          </div>
        ))
      ) : (
        <Fragment>
          <h4>
            No movies found, try searching for something or refreshing the page
          </h4>
        </Fragment>
      )}
    </div>
  );
};

export default MovieGrid;
