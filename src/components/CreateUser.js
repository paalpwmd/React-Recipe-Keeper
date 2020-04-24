import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = (props) => {
  const [user, setUser] = useState({ username: '' });
  const onChangeTitle = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/users/add', user).then((res) => console.log(res.data));
    setUser({ username: '' });
  };

  const onChangeUsername = (e) => {
    e.preventDefault();
    setUser({ username: e.target.value });
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username: (No spaces) </label>
          <input
            type='text'
            required
            className='form-control'
            value={user.username}
            onChange={onChangeUsername}
          />
        </div>
        <div>
          <button className='btn btn-primary' type='submit'>
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
