import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../movie/MovieCard';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
  return (
    <>
      <div className='row'>
        {movies.map((movie, index) => (
          <div key={index} className='column'>
            <Link to={`/movie-details/${movie.id}`}>
              <MovieCard key={movie.id} movie={movie} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieList;
