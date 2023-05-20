const express = require('express');
const bodyparser = require('body-parser');
const date = require(__dirname + "/date.js");
const app = express();

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

var items = ["Buy Food","Cook Food"];
var workitems = [];

app.get("/",function(req,res){

  var day = date.getDate();
  res.render("list",{listheading:day,newlistitem:items});
});

app.post("/",function(req,res){
  var item = req.body.newItem;

  if (req.body.list === "Work"){
    workitems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
  res.render("list",{listheading:"Work List",newlistitem:workitems});
})

app.get("/about",function(req,res){
  res.render("about");
})


app.listen(3000,function(){
  console.log("Listening to port 3000....");
})
