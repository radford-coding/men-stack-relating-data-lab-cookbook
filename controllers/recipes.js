const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find({ owner: req.session.user._id }).sort('name');
    res.render('recipes/index.ejs', { recipes });
});

router.get('/new', async (req, res) => {
    const ingredients = await Ingredient.find({}).sort('name');
    res.render('recipes/new.ejs', { ingredients, });
});

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        await Recipe.create(req.body);
        res.redirect('/recipes');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

router.get('/:recipeID', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeID).populate('ingredients owner');
    const editPrivilege = req.session.user._id == recipe.owner._id;
    //! I honestly do not know why == works but === doesn't work here. They should be the same. Dear JS gods why
    // console.log(`session: ${req.session.user._id}\nowner:   ${recipe.owner._id}`);
    res.render('recipes/show.ejs', { recipe, editPrivilege, });
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