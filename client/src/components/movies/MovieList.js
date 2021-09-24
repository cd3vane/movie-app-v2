import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../movie/MovieCard';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
  const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

  return (
    <>
      <div className='row'>
        {movies.map((movie) => (
          <div className='column'>
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
  movies: PropTypes.object.isRequired
};

export default MovieList;
