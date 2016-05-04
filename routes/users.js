const express = require('express');
const router  = express.Router();
const knex = require("../db/knex");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const helpers = require("../helpers/authHelpers")
var multer = require('multer');
var upload = multer({dest: './uploads'});

// get index
router.get('/', (req,res) => {
  res.render("users/index", {message: req.flash('success')});

});

// new
router.get('/new', (req,res) => {
  res.render('users/new');
});

// show
router.get('/:id', (req,res) => {
  knex('users').where('id',+req.params.id).first()
  .then(user => {
    res.render('users/show', {user})
  });

});

// post
router.post('/',  upload.single('profileimage'),(req,res) => {
var fname = req.body.user.fname;
var lname = req.body.user.lname;
var email = req.body.user.email;
var password = req.body.user.password;
var password = req.body.user.password2;
// eval(require('locus'));

//To Do: check for: mimetype: 'image/jpeg' etc.
  if(req.file){
    console.log('Uploading File...');
    var profileimage = req.file.filename;
  } else {
    console.log('No File Uploaded...');
    var profileimage = 'noimage.jpg';
  }
// validate form data
//   req.checkBody('email','Email field is required').notEmpty();
//   req.checkBody('email','Email is not valid').isEmail();
//   req.checkBody('password','Password field is required').notEmpty();
//   req.checkBody('password2','Passwords do not match').equals(req.body.user.password);

// var errors = req.validationErrors();
// if(errors){
// // eval(require('locus'));
//   console.log('Errors')
//   res.render('users/new', {errors: errors})
// } else {
//   console.log('No Errors')

  bcrypt.hash(req.body.user.password, SALT_WORK_FACTOR, (err,hash) => {
    knex('users')
    .insert({first_name: fname, last_name: lname,email: email,
    password: hash, profileimage: profileimage})
    .then(() =>{
      res.redirect("/");
    });
  });
// } // end if

});

//put/patch
router.put('/:id', (req,res) => {

});

router.delete('/:id', (req,res) => {

});

module.exports = router
