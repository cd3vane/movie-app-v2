import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import MovieList from '../movies/MovieList';
import { connect } from 'react-redux';
import { getListById } from '../../actions/lists';

const List = ({ match, auth, getListById, lists: { list, listsLoading } }) => {
  useEffect(
    () => {
      getListById(match.params.list_id);
    },
    [getListById],
    match.params.list_id
  );

  return (
    <Fragment>
      {list === null || listsLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to={'/account/lists'}>Back to lists</Link>
          <h1 className='large'>{list.name}</h1>

          {list.movies.length > 0 ? (
            <Fragment>
              <MovieList movies={list.movies} />
            </Fragment>
          ) : (
            <Fragment>
              <h4>No movies in this list yet</h4>
              <Link to={`movies/1`}>Browse for more</Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

List.propTypes = {
  getListById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lists: state.lists
});

export default connect(mapStateToProps, { getListById })(List);