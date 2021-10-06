import React, { Fragment, useState, useEffect } from 'react';
import MovieButtons from './MovieButtons';
import { getListsByUser } from '../../actions/lists';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MovieActions = ({ id, lists: { lists }, movie, getListsByUser }) => {
  useEffect(() => {
    getListsByUser(id);
  }, [getListsByUser, id]);
  const [showButtons, toggleButtons] = useState(false);

  return (
    <div className='movie-actions'>
      <div
        className={
          showButtons
            ? 'button-list button-list--active btn-rounded'
            : 'button-list btn-rounded'
        }
      >
        <div
          onClick={(e) => toggleButtons(!showButtons)}
          className='button-list__content btn-light'
        >
          <i className='text-primary fa fa-list' aria-hidden='true'></i>
          <p className='text-primary'>Toggle List Actions</p>
        </div>
        {showButtons && (
          <Fragment>
            {lists && lists.length > 0 ? (
              <MovieButtons lists={lists} movie={movie} />
            ) : (
              <h4>Create a profile to add movies to lists</h4>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

MovieActions.propTypes = {
  lists: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getListsByUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  auth: state.auth
});

export default connect(mapStateToProps, { getListsByUser })(MovieActions);
