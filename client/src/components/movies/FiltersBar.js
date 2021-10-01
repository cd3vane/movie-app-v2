import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const FiltersBar = ({ toggleTable }) => {
  return (
    <div className='bar bg-primary'>
      <h1>
        <Link to={'/movies/1'}>
          <i className='fas fa-film'></i> MovieFilms
        </Link>
      </h1>
      <Fragment>
        <button onClick={(e) => toggleTable(false)}>Grid</button>
        <button onClick={(e) => toggleTable(true)}>List</button>
      </Fragment>
    </div>
  );
};
