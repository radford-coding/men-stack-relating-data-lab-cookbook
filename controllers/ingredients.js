const express = require('express');
const router = express.Router();

// const User = require('../models/user.js');
// const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    const ingredients = await Ingredient.find({}).sort('name');
    res.render('ingredients/index.ejs', { ingredients });
});

router.post('/', async (req, res) => {
    req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase();
    const duplicate = await Ingredient.findOne({ name: req.body.name });
    if (duplicate) {
        res.send(`${duplicate.name} already listed.<br><br><a href="/ingredients">Back</a>`);
        return;
    } else if (!req.body.name.match(/^[\w\s]+$/)) {
        res.send('Ingredient names may only contain alphanumeric characters.<br><br><a href="/ingredients">Back</a>');
        return;
    };
    await Ingredient.create(req.body);
    res.redirect('/ingredients');
});

module.exports = router;