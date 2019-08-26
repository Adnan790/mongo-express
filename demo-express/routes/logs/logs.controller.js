let controller ={};
var mongoose = require('mongoose');
var LogsUser = mongoose.model('logs');
var User = mongoose.model('users');
  
controller.getLoginUser=(payload)=>{
return new Promise((resolve,reject)=>{
    try {
        LogsUser.find({},function (err, user) {
            if(err)
            {
                reject(err);
            }
            else
            {
               resolve(user);    
            }
        })   
    } catch (err) {
        console.error(err);
        
    }
})
}
module.exports = controller;