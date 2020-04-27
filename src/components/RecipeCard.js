import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './recipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className='card recipeCard'>
      <div className='card-body'>
        <h5 className='card-title'>{recipe.title}</h5>
        <p className='card-text'>{recipe.description}</p>
        <Link to={`recipes/${recipe._id}`} className='btn btn-primary'>
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
