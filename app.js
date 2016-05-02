
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('cookie-session') ;
const morgan = require('morgan');
const routes = require('./routes');
const flash = require('connect-flash');
const passport = require('passport');

app.use('view engine', 'jade');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}) );
app.use(methodOverride("_method"));

app.use(session({
  secret: process.env.SECRET
}));

app.use(flash());

app.get("/", function(req,res){
    res.redirect("/auth/login");
})
//
app.use("/users", routes.users);
app.use("/auth", routes.auth);
app.use("/course", routes.courses);
// Catch all errors
app.get("*", function(req,res){
    res.render("error")
})
//
app.listen(3000, () => {
    console.log("Server starting on port 3000")
});



