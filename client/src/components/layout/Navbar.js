import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = () => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'> Developers </Link>
      </li>
      <li>
        <Link to='/posts'> Posts </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'> Dashboard </span>
        </Link>
      </li>
      <li>
        <a href='/dashboard'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'> Logout </span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Movie Shiz
        </Link>
      </h1>
      <Fragment>{authLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
