import React, { useEffect, useState, Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import MovieTable from '../movieLayouts/MovieTable';
import MovieGrid from '../movieLayouts/MovieGrid';
// import { FiltersBar } from './FiltersBar';
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
      {/* 
      Experimental feature filter bar not fully implemented
      <FiltersBar toggleTable={toggleTable} /> 
      */}
      <div className='movie-results'>
        {isTable ? (
          <MovieTable movies={movies} />
        ) : (
          <MovieGrid movies={movies} />
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
