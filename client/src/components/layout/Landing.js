import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../auth/Login';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1 className='large text-primary'>Welcome to MovieFilms</h1>
        <Login />
      </div>
    </section>
  );
};

export default Landing;
