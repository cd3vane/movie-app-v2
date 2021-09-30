import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListPreview from './ListPreview';

const ListItem = ({ list: { _id, name, movies } }) => {
  return (
    <div className='list-container'>
      <div>
        {movies.length > 0 ? (
          <Fragment>
            <h2>
              <Link to={`/account/lists/${_id}`}>{name}</Link>
            </h2>

            <ListPreview movies={movies} />
          </Fragment>
        ) : (
          <Fragment>
            <h2>{name}</h2>
            <h4>No movies in this list yet</h4>
            <Link to={'/movies/1'}>Browse for more</Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListItem;
