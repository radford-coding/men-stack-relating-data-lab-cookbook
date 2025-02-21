const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    const ingredients = await Ingredient.find({}).sort('name');
    res.render('ingredients/index.ejs', { ingredients });
});

module.exports = router;