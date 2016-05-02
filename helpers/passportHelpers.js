
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
  passReqToCallback: true
}, function (req,username, password, done){
  knex('users').where("email", username).first().then(user => {
    if(!user){
      return done(null,false, {message: "Invalid credentials"})
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(!isMatch){
        return done(null,false, {message: "Invalid credentials"})
      }
      else {
        return done(null,user, {message: "Welcome back!"})
      }
    })
  }).catch(err => {
    return done(err,false)
  })
}))

passport.serializeUser((user,done) =>{
  done(null,user.id)
})

passport.deserializeUser((id,done) => {
  knex('users').where("id", id).first().then(user => {
    done(null, user);
    // req.user = user
  }).catch(err => {
    console.log("DESERIALIZE FAILED", err)
    done(err,false)
  })
})

module.exports = { passport};