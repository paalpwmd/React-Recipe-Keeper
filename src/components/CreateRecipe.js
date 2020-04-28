import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

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
      newArr[index].quantity = parseInt(e.target.value);
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
      ingredients: [...ingredients, {}],
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
              <div>
                <label className='ml-3 mb-4' htmlFor='quantity'>
                  Quantity
                </label>
                <input
                  type='number'
                  className='ml-3 mb-4'
                  onChange={onChangeQuantity(index, x.quantity)}
                />
                <label htmlFor='measurement' className='ml-3 mb-4'>
                  Measurement
                </label>
                <input
                  type='text'
                  className='ml-3 mb-4'
                  onChange={onChangeMeasurement(index, x.measurement)}
                />
                <label className='ml-3 mb-4' htmlFor='ingredient'>
                  Ingredient
                </label>
                <input
                  type='text'
                  className='ml-3 mb-4'
                  name='ingredient'
                  onChange={onChangeIngredient(index, x.ingredient)}
                />
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
            required
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
            required
            className='form-control'
            onChange={onChangeLink}
          />
        </div>
        <input type='file' accept='image/*' capture='camera' />

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
