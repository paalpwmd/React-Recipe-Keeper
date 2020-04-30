import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const toggleMenu = () => {
    document
      .querySelector('#navbarSupportedContent')
      .classList.toggle('collapse');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>
        Recipe Tracker
      </Link>
      <button onClick={toggleMenu} className='navbar-toggler' type='button'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
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
