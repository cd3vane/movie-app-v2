import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addList } from '../../actions/lists';

const ListForm = ({ addList, history }) => {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');

  return (
    <div className='list-form'>
      <div className='bg-primary p'>
        <h3>Create a new list</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addList({ name, description }, history);
          setName('');
          setDesc('');
        }}
      >
        <input
          name='name'
          placeholder='Name your list'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          name='description'
          cols='30'
          rows='5'
          placeholder='Give it a description'
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ListForm.propTypes = {
  addList: PropTypes.func.isRequired
};

export default connect(null, { addList })(ListForm);
