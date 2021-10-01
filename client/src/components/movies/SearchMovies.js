import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ViewMovies from './ViewMovies';
import { searchMovies } from '../../actions/movie';
import PropTypes from 'prop-types';

const SearchMovies = ({ match, searchMovies, movie: { movies } }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    searchMovies(text, match.params.page_number);
  }, [searchMovies, match.params.page_number]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please type in a movie name');
      return;
    }
    setLoading(true);

    searchMovies(text, match.params.page_number);

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='search'>
          <input
            type='text'
            placeholder='Enter a movie title'
            className='search-term'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type='submit' className='search-button' value='Search'>
            <i className='fa fa-search'></i>{' '}
          </button>
        </div>
      </form>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='search-results'>
            <ViewMovies movies={movies} />
          </div>
        </Fragment>
      )}
    </>
  );
};

SearchMovies.propTypes = {
  searchMovies: PropTypes.func.isRequired,
  movies: PropTypes.object
};

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps, { searchMovies })(SearchMovies);
