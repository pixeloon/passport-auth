
const express = require('express');
const router  = express.Router();

const knex  = require('../db/knex');
const passport = require("passport");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const helpers = require("../helpers/authHelpers")
const passportHelpers = require("../helpers/passportHelpers")

router.get('/login', helpers.preventLoginSignup, function(req,res){
  res.render("auth/login", {title: 'Login', message: req.flash('error')})
});

router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/users',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: true,
    }
  ));

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/auth/login')
});

router.get('/register', (req,res) => {
  res.render('auth/register', {title: 'Register'});
});


module.exports = router;
