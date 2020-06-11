'use strict';
const path = require('path');
let fs = require('fs');
let dir = './_assets';
const express = require('express'),
  app = express(),
  http = require('http').Server(app).listen(8080),
  upload = require('express-fileupload');
app.use(upload());

console.log('server started');
app.get('/', function(req,res) {
  res.sendFile(__dirname+'/home.html');
});
app.get('/_assets', function(req,res) {
  res.sendFile(__dirname+'/index.html');
});
app.post('/_assets', function(req,res) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  if(req.files) {
    let file = req.files.filename;
    let filename = file.name;
    let sliced = filename.split('.');
    let converted = path.extname(filename);
    converted = '.jpg';
    let newName = `${sliced[0]}${converted}`;
    file.mv('./_assets/' + newName, function(err) {
      if(err){
        console.log(err);
        res.send('error occured');
      }
    });
  }
});

