import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'> Discover </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'> Profile </span>
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
        <Link to='/movies'>
          <i className='fas fa-code'></i> Movie Shiz
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

export default connect(null, { logout })(Navbar);
