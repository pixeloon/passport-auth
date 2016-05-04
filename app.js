
require("dotenv").load();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('cookie-session') ;
const favicon = require('serve-favicon');
const morgan = require('morgan');
const routes = require('./routes');
const flash = require('connect-flash');
const passport = require('passport');
const expressValidator = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;
const passportHelpers = require("./helpers/passportHelpers");
const helpers = require("./helpers/authHelpers");
var multer = require('multer');
var upload = multer({dest: './uploads'});

app.set('view engine', 'jade');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}) );
app.use(methodOverride("_method"));

app.use(session({
  secret: process.env.SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.use(helpers.currentUser)

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.get("/", function(req,res){
    res.render("index", {title: 'Home'});
})

//
// app.use("/users/:user_id/courses", routes.courses);
app.use("/users", routes.users);
app.use("/auth", routes.auth);

// Catch all errors
app.get("*", function(req,res){
    res.render("error")
})
//
app.listen(3000, () => {
    console.log("Server starting on port 3000")
});



