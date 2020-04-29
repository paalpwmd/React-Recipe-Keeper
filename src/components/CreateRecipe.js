import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './CreateRecipe.css';

const CreateRecipe = () => {
  const initialState = {
    username: 'Paal',
    title: '',
    description: '',
    ingredients: [],
    instructions: [],
    link: '',
  };

  const [recipe, setRecipe] = useState(initialState);

  const onChangeTitle = (e) => {
    e.preventDefault();
    setRecipe({
      ...recipe,
      title: e.target.value,
    });
  };

  const clearForms = () => {
    let inputs = document.getElementsByTagName('input');
    inputs = Array.from(inputs);
    inputs.forEach((x) => (x.value = ''));
  };

  const onChangeDescription = (e) => {
    e.preventDefault();
    setRecipe({
      ...recipe,
      description: e.target.value,
    });
  };
  const onChangeQuantity = (index, value) => {
    return function (e) {
      e.preventDefault();
      let newArr = [...recipe.ingredients];
      let wholeNum = Math.floor(newArr[index].quantity);
      let fraction = newArr[index].quantity - wholeNum;

      newArr[index].quantity = parseInt(e.target.value) + fraction;
      setRecipe({
        ...recipe,
        ingredients: newArr,
      });
    };
  };

  const onChangeMeasurement = (index, value) => {
    return function (e) {
      e.preventDefault();
      let newArr = [...recipe.ingredients];
      newArr[index].measurement = e.target.value;
      setRecipe({
        ...recipe,
        measurement: newArr,
      });
    };
  };
  const onChangeIngredient = (index, value) => {
    return function (e) {
      e.preventDefault();
      let newArr = [...recipe.ingredients];
      newArr[index].ingredient = e.target.value;
      setRecipe({
        ...recipe,
        ingredients: newArr,
      });
    };
  };

  const addNewIngredient = (e) => {
    e.preventDefault();
    let ingredients = recipe.ingredients;
    setRecipe({
      ...recipe,
      ingredients: [...ingredients, { quantity: 0 }],
    });
  };

  const onChangeInstructions = (index, value) => {
    return function (e) {
      e.preventDefault();
      let newArr = [...recipe.instructions];
      newArr[index].step = e.target.value;
      setRecipe({
        ...recipe,
        instructions: newArr,
      });
    };
  };

  const addNewInstruction = (e) => {
    e.preventDefault();
    let instructions = recipe.instructions;
    setRecipe({
      ...recipe,
      instructions: [...instructions, {}],
    });
  };

  const onChangeNotes = (e) => {
    e.preventDefault();
    setRecipe({
      ...recipe,
      notes: e.target.value,
    });
  };

  const onChangeLink = (e) => {
    e.preventDefault();
    setRecipe({
      ...recipe,
      link: e.target.value,
    });
  };

  const onAddFraction = (index, value) => {
    return function (e) {
      e.preventDefault();
      let newArr = [...recipe.ingredients];
      let fraction = eval(e.target.value);
      console.log(fraction);
      newArr[index].quantity = Math.floor(newArr[index].quantity) + fraction;
      setRecipe({
        ...recipe,
        ingredients: newArr,
      });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myRecipe = recipe;
    axios.post('/recipes/add', myRecipe).then((res) => console.log(res.data));
    clearForms();
    window.location = '/';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title: </label>
          <input
            type='text'
            required
            className='form-control'
            onChange={onChangeTitle}
          />
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            required
            className='form-control'
            onChange={onChangeDescription}
          />
        </div>
        <div className='form-group'>
          <label>Ingredients</label>
          {recipe.ingredients.map((x, index) => {
            return (
              <div className='ingredientAdd'>
                <label className='ml-3 mb-4' htmlFor='ingredient'>
                  Ingredient
                </label>
                <input
                  required
                  type='text'
                  className='ml-3 mb-4'
                  name='ingredient'
                  onChange={onChangeIngredient(index, x.ingredient)}
                />
                <label className='ml-3 mb-4' htmlFor='quantity'>
                  Quantity
                </label>
                <input
                  type='number'
                  className='ml-3 mb-4'
                  onChange={onChangeQuantity(index, x.quantity)}
                />
                <select
                  className='form-control d-inline mb-4 ml-3'
                  id='selFraction'
                  onChange={onAddFraction(index, x.quantity)}
                >
                  <option></option>
                  <option>1/4</option>
                  <option>1/3</option>
                  <option>1/2</option>
                  <option>2/3</option>
                  <option>3/4</option>
                </select>
                <label htmlFor='measurement' className='ml-3 mb-4'>
                  Measurement
                </label>

                <select
                  className='ml-3 mb-4 form-control d-inline w-25 mb-4'
                  onChange={onChangeMeasurement(index, x.measurement)}
                >
                  <option></option>
                  <option>Each</option>
                  <option>Cup</option>
                  <option>Tablespoon</option>
                  <option>Teaspoon</option>
                  <option>Gallon</option>
                  <option>Quart</option>
                  <option>Pint</option>
                  <option>Liter</option>
                  <option>Milliliter</option>
                  <option>Inch</option>
                  <option>Pound</option>
                  <option>Ounce</option>
                  <option>Fluid Ounce</option>
                  <option>Centimeter</option>
                  Millimeter
                  <option>Fluid Ounce</option>
                </select>
              </div>
            );
          })}
          <button
            className='btn btn-primary btn-block w-25'
            onClick={addNewIngredient}
          >
            {recipe.ingredients.length > 0
              ? 'Add Another Ingredient'
              : 'Add An Ingredient'}
          </button>
        </div>

        <div className='form-group'>
          <label>Instructions</label>
          {recipe.instructions.map((x, index) => {
            return (
              <div>
                <p className='w-25'>Step: {index + 1}</p>
                <input
                  type='text'
                  className='ml-3 mb-4 form-control'
                  onChange={onChangeInstructions(index, x.ingredient)}
                />
              </div>
            );
          })}
          <button
            className='btn btn-primary btn-block w-25'
            onClick={addNewInstruction}
          >
            {recipe.instructions.length > 0
              ? 'Add Another Instruction'
              : 'Add An Instruction'}
          </button>
        </div>
        <div className='form-group'>
          <label>Notes </label>
          <input
            type='textarea'
            className='form-control'
            onChange={onChangeNotes}
          />
        </div>
        <div className='form-group'>
          <label>
            Link (If from another source, add the link to the original recipe)
          </label>
          <input
            type='textarea'
            className='form-control'
            onChange={onChangeLink}
          />
        </div>

        <div className='mt-3'>
          <button className='btn btn-primary' type='submit'>
            Create New Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
