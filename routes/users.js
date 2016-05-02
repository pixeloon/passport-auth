const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const helpers = require("../helpers/authHelpers")

const knex  = require('../db/knex');

// get index
router.get('/', (req,res) => {
  res.render("users/index", {message: req.flash('success')});

});

// new
router.get('/new', (req,res) => {
  res,render('users/new');
});

// show
router.get('/:id', (req,res) => {
  knex('users').where('id',+req.params.id).first()
  .then(user => {
    res.render('users/show', {user})
  });

});

// post
router.post('/', (req,res) => {
  knex('users').insert(req.body.user).where('id', +req.params.id)
  .then(() =>{
    res.redirect("/");
  });

});

//put/patch
router.put('/:id', (req,res) => {

});

router.delete('/:id', (req,res) => {

});

module.exports = router
