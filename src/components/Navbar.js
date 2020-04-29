import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>
        Recipe Tracker
      </Link>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to='/' className='nav-link'>
              Recipes
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/create' className='nav-link'>
              Add Recipe
            </Link>
          </li>
          {/* <li className='navbar-item'>
            <Link to='/user' className='nav-link'>
              Create User
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
