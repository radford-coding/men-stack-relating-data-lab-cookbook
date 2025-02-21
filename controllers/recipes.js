const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index.ejs', { recipes });
    // const recipes = await Recipe.findById('67b7a1fea44a845679d839e2').populate('ingredients');
    // console.log(recipes);
    // res.render('recipes/index.ejs', { recipes: [recipes] });
});

router.get('/new', async (req, res) => {
    const ingredients = await Ingredient.find({});
    res.render('recipes/new.ejs', { ingredients, });
});

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id; // use ID for referenced documents
        await Recipe.create(req.body);
        res.redirect('/recipes');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

router.get('/:recipeID', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeID).populate('ingredients');
    console.log('here');
    res.render('recipes/show.ejs', { recipe });
});

router.delete('/:recipeID', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.recipeID);
    res.redirect('/recipes');
});

router.get('/:recipeID/edit', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeID);
    const ingredients = await Ingredient.find({});
    res.render('recipes/edit.ejs', { recipe, ingredients });
});

router.put('/:recipeID', async (req, res) => {
    await Recipe.findByIdAndUpdate(req.params.recipeID, req.body);
    res.redirect(`/recipes/${req.params.recipeID}`);
});

module.exports = router;