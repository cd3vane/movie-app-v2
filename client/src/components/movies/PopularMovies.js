import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { getPopularMovies } from '../../actions/movie';
import PropTypes from 'prop-types';

const PopularMovies = ({
  match,
  getPopularMovies,
  movie: { movies, loading }
}) => {
  const location = useLocation();
  const history = useHistory();
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page) || 1;

  const [currentPage, setCurrentPage] = useState(initialPageNumber);

  const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

  useEffect(() => {
    getPopularMovies(match.params.pageNumber);
    history.push(`${currentPage}`);
  }, [currentPage, getPopularMovies, match.params.pageNumber]);

  const paginate = (data) => {
    let pageNumber = data.selected + 1;
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Fragment>
        {loading || movies === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className='popular-movies'>
              <MovieList movies={movies} />
            </div>
          </Fragment>
        )}
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={500}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginate}
          containerClassName={'pagination'}
          activeClassName={'text-dark'}
        />
      </Fragment>
    </>
  );
};

PopularMovies.propTypes = {
  getPopularMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps, { getPopularMovies })(PopularMovies);
