import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/search/1'> Search</Link>
      </li>
      <li>
        <Link to='/profiles'> Profiles </Link>
      </li>
      <li>
        <Link to='/account/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'> Dashboard </span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='/'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'> Logout </span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to={'/movies/1'}>
          <i className='fas fa-film'></i> MovieFilms
        </Link>
      </h1>
      <Fragment>{authLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
