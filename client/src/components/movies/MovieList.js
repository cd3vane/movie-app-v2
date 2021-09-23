import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { getPopularMovies } from '../../actions/movie';

import MovieCard from '../movie/MovieCard';
import PropTypes from 'prop-types';

const MovieList = ({ match, getPopularMovies, movie: { movies, loading } }) => {
  const location = useLocation();
  const history = useHistory();
  const path = window.location.pathname;
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
        {loading ? (
          <Spinner />
        ) : (
          <div className='popular-movies'>
            <div className='row'>
              {movies.map((movie) => (
                <div className='column'>
                  <Link to={`/movie-details/${movie.id}`}>
                    <MovieCard key={movie.id} movie={movie} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Fragment>
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
    </>
  );
};

MovieList.propTypes = {
  getPopularMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps, { getPopularMovies })(MovieList);
