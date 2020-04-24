import React, { useEffect, useState } from 'react';
import './recipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className='card recipeCard'>
      <div className='card-body'>
        <h5 className='card-title'>{recipe.title}</h5>
        <p className='card-text'>{recipe.description}</p>
        <a href='#' class='btn btn-primary'>
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
