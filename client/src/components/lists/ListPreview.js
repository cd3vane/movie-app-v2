import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../movie/MovieCard';
import PropTypes from 'prop-types';

const ListPreview = ({ movies }) => {
  const limit = 5;
  return (
    <>
      <div className='preview-row'>
        {movies.map((movie, index) => (
          <div key={index} className='preview-column'>
            {index < limit && (
              <Link to={`/movie-details/${movie.id}`}>
                <MovieCard key={movie.id} movie={movie} isPreview={true} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

ListPreview.propTypes = {
  movies: PropTypes.array.isRequired
};

export default ListPreview;
