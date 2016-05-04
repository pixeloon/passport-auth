const express = require('express');
const route = express();

const users = require("./users");
const auth = require("./auth");
const courses = require("./courses");

route.get("/about", function(req,res){
    res.render("about", {title: 'About'});
})

route.get("/contact", function(req,res){
    res.render("contact", {title: 'Contact'});
})

module.exports = {
  users,
  auth,
  courses
}