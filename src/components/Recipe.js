import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Axios from 'axios';

const RecipesList = (props) => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    Axios.get(`${props.location.pathname}`).then((res) => setRecipe(res.data));
  }, []);

  return (
    <div id='recipeSingle' className='container border border-secondary p-2'>
      {recipe._id != null ? (
        <div>
          <div className='title text-center'>
            <h1>{recipe.title}</h1>
            <p>
              <em>{recipe.description}</em>
            </p>
          </div>
          <div>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients[0].map((item) => {
                return (
                  <div className='d-inline'>
                    <li>
                      {item.quantity + ' '}
                      {item.measurement + ' '}
                      {item.ingredient}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        'Loading....'
      )}
    </div>
  );
};

export default RecipesList;
