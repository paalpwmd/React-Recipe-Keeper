import React, { useState, useEffect } from 'react';
import Timer from './utils/Timer';
import './Recipe.css';

import Axios from 'axios';

const RecipesList = (props) => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    Axios.get(`${props.location.pathname}`).then((res) => setRecipe(res.data));
  }, []);

  return (
    <div id='recipeSingle' className='container shadow p-2'>
      {recipe._id != null ? (
        <div>
          <div className='title text-center'>
            <h1>{recipe.title}</h1>
            <p>
              <em>{recipe.description}</em>
            </p>
          </div>
          <div id='ingredients-list' className='w-50 mt-5 mx-auto p-2 shadow '>
            <h2 className='text-center p-2'>Ingredients</h2>
            <ul className='list-group list-group-flush'>
              {recipe.ingredients[0].map((item) => {
                return (
                  <li className='list-group-item'>
                    <input type='checkbox' className='mx-3'></input>
                    {item.quantity + ' '}
                    {item.measurement + ' '}
                    {item.ingredient}
                  </li>
                );
              })}
            </ul>
          </div>
          <div id='instructions' className='px-5 mt-5'>
            {recipe.instructions[0].map((item, index) => {
              return (
                <div className='d-inline'>
                  <p>
                    <strong>Step {index + 1}</strong>
                  </p>
                  <p>{item.step}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        'Loading....'
      )}
    </div>
  );
};

export default RecipesList;
