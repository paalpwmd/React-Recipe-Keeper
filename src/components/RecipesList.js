import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Axios from 'axios';
import './RecipesList.css';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    Axios.get('/recipes').then((res) => setRecipes(res.data));
  }, []);

  return (
    <div id='recipeContainer'>
      {recipes.length > 0
        ? recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })
        : 'Loading....'}
    </div>
  );
};

export default RecipesList;
