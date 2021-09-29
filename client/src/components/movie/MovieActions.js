import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToList, removeFromList } from '../../actions/lists';
import PropTypes from 'prop-types';

const MovieActions = ({
  watchlist,
  movie: { id, title },
  addToList,
  removeFromList,
  history
}) => {
  useEffect(() => {});

  return (
    <Fragment>
      {1 === 1 ? (
        <button onClick={(e) => removeFromList(id, history)}>
          Remove from List
        </button>
      ) : (
        <button onClick={(e) => addToList(id, history)}>Add to List</button>
      )}
    </Fragment>
  );
};

MovieActions.propTypes = {
  addToList: PropTypes.func.isRequired,
  removeFromList: PropTypes.func.isRequired
};

export default connect(null, { addToList, removeFromList })(MovieActions);
