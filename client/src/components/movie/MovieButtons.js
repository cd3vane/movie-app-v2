import React, { Fragment } from 'react';
import MovieButton from './MovieButton';

const MovieButtons = ({ lists, movie }) => {
  return (
    <Fragment>
      <Fragment>
        <button>Create new list</button>
        {lists.length > 0 ? (
          lists.map((list) => (
            <MovieButton key={list._id} list={list} movie={movie} />
          ))
        ) : (
          <h4>No lists yet. Have you created a profile?</h4>
        )}
      </Fragment>
    </Fragment>
  );
};

export default MovieButtons;
