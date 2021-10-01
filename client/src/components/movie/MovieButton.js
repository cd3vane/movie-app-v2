import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToList, removeFromList } from '../../actions/lists';

const MovieButton = ({
  list: { _id, name, movies },
  movie: { title, id },
  removeFromList,
  addToList
}) => {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    checkList();
  }, []);

  const checkList = () => {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title === title) {
        setInList(true);
      }
    }
  };
  return (
    <Fragment>
      <li className='button-item'>
        {inList ? (
          <button
            type='button'
            className='btn remove-btn btn-rounded'
            onClick={(e) => {
              removeFromList(_id, id);
              checkList();
            }}
          >
            Remove from {name}
          </button>
        ) : (
          <button
            type='button'
            className='btn add-btn btn-rounded'
            onClick={(e) => {
              addToList(_id, id);
              checkList();
            }}
          >
            Add to {name}
          </button>
        )}
      </li>
    </Fragment>
  );
};

MovieButton.propTypes = {
  list: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  removeFromList: PropTypes.func.isRequired,
  addToList: PropTypes.func.isRequired
};

export default connect(null, { addToList, removeFromList })(MovieButton);
