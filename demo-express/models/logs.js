const mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var logsSchema = new mongoose.Schema({
    email: String,
    type: String
  }, {
    timestamps:true,
 });
 module.exports = mongoose.model('logs',logsSchema);