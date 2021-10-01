import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MovieButton from './MovieButton';

const MovieButtons = ({ lists, movie }) => {
  return (
    <Fragment>
      <Fragment>
        <ul className='button-list__lists'>
          {lists.length > 0 ? (
            <Fragment>
              <li className='button-item'>
                <Link to='/create-list'>
                  <button type='button' className='btn add-btn btn-rounded'>
                    + Create new list
                  </button>
                </Link>
              </li>
              {lists.map((list) => (
                <MovieButton key={list._id} list={list} movie={movie} />
              ))}
            </Fragment>
          ) : (
            <li>
              <h4>No lists yet. Have you created a profile?</h4>
            </li>
          )}
        </ul>
        <div className='button-list__footer'>
          <i className='fa fa-angle-double-down' aria-hidden='true'></i>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default MovieButtons;
