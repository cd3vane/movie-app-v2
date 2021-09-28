import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReview } from '../../actions/review';

const ReviewForm = ({ addReview, history }) => {
  const [text, setText] = useState('');

  return (
    <div className='review-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addReview({ text }, history);
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a review'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  addReview: PropTypes.func.isRequired
};

export default connect(null, { addReview })(ReviewForm);
