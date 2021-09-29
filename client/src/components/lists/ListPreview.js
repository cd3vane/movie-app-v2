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
          <Fragment>
            {index < limit && (
              <div key={index} className='preview-column'>
                <Link to={`/movie-details/${movie.id}`}>
                  <MovieCard key={movie.id} movie={movie} isPreview={true} />
                </Link>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

ListPreview.propTypes = {
  movies: PropTypes.array.isRequired
};

export default ListPreview;
