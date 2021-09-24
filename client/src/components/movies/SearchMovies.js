import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { searchMovies } from '../../actions/movie';
import PropTypes from 'prop-types';

const SearchMovies = ({ searchMovies, movie: { movies } }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please type in a movie name');
      return;
    }
    setLoading(true);

    searchMovies(text);

    setText('');

    setLoading(false);
  };

  return (
    <>
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Search</label>
          <input
            type='text'
            placeholder='Enter a movie title'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type='submit' className='btn btn-block' value='Search' />
        </div>
      </form>
      <Fragment></Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='search-results'>
            <MovieList movies={movies} />
          </div>
        </Fragment>
      )}
    </>
  );
};

SearchMovies.propTypes = {
  searchMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps, { searchMovies })(SearchMovies);
