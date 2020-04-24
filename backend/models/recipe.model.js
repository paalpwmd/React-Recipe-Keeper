const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    username: { type: String, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: Array, required: true },
    notes: { type: String, required: false },
    link: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
