const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
    const users = await User.find({}).sort('username');
    res.render('users/index.ejs', { users, });
});

router.get('/:userID', async (req, res) => {
    const user = await User.findById(req.params.userID);
    const recipes = await Recipe.find({ owner: req.params.userID });
    res.render('users/show.ejs', { user, recipes, });
});


module.exports = router;