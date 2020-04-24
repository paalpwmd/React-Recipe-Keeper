import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipesList from './components/RecipesList';
import EditRecipe from './components/EditRecipe';
import CreateRecipe from './components/CreateRecipe';
import CreateUser from './components/CreateUser';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <br />
        <Route path='/' exact component={RecipesList} />
        <Route path='/edit:id' component={EditRecipe} />
        <Route path='/create' component={CreateRecipe} />
        <Route path='/user' component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
