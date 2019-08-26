const mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var userSchema = new mongoose.Schema({
     firstName:String,
     lastName:String,
     email:String,
     password:String,
     age: Number
 },{ strict: false });

 module.exports = mongoose.model('users',userSchema);