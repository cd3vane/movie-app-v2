import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import MovieCard from '../movie/MovieCard';
import MovieRow from '../movie/MovieRow';
import { FiltersBar } from './FiltersBar';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ViewMovies = ({ movies }) => {
  const [isTable, toggleTable] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page) || 1;

  const [currentPage, setCurrentPage] = useState(initialPageNumber);

  useEffect(() => {
    history.push(`${currentPage}`);
  }, [currentPage, history]);

  const paginate = (data) => {
    let pageNumber = data.selected + 1;
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <FiltersBar toggleTable={toggleTable} />
      <div className='movie-results'>
        {isTable ? (
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
        ) : (
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
                  No movies found, try searching for something or refreshing the
                  page
                </h4>
              </Fragment>
            )}
          </div>
        )}
        {movies.length > 19 && (
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
        )}
      </div>
    </Fragment>
  );
};

ViewMovies.propTypes = {
  movies: PropTypes.array.isRequired
};

export default ViewMovies;
