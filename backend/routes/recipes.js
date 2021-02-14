const router = require('express').Router();
const path = require('path')
let Recipe = require(path.join(__dirname + '/../models/recipe.model.js'));

router.route('/').get((req, res) => {
  Recipe.find()
    .then((Recipes) => res.json(Recipes))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const username = req.body.username;
  const description = req.body.description;
  const date = new Date();
  const ingredients = Array(req.body.ingredients);
  const instructions = Array(req.body.instructions);
  const notes = req.body.notes;

  const newRecipe = new Recipe({
    title,
    username,
    description,
    date,
    ingredients,
    instructions,
    notes,
  });

  newRecipe
    .save()
    .then(() => res.json('Recipe added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => res.json(recipe))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recipe Deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      recipe.username = req.body.username;
      recipe.description = req.body.description;
      recipe.date = new Date();
      recipe.ingredients = req.body.ingredients;
      recipe.instructions = req.body.instructions;
      recipe.notes = req.body.notes;

      recipe
        .save()
        .then(() => res.json('Recipe added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
