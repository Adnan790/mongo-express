let controller ={};
var mongoose = require('mongoose');
var User = mongoose.model('users');
var bcryptHelper = require('../../helpers/bcrypt');
var LogsUser = mongoose.model('logs');

controller.register = (payload) =>{
    return new Promise(async(resolve, reject) =>{
        try{
         payload.password = await bcryptHelper.getHash(payload.password);  
         let user = await User.findOne({email:payload.email});
         if(user)
          {
            resolve('AlreadyRegistered');
            console.log(user);
          
          }
          else
          {              
            User.create(payload, async function(err ,small){
              if(err)
                {
                    reject(err);
                }
                else
                {
                  resolve(small);
                }
            })
              
          }
        
        } catch(err){
        console.error(err);
    };
    })
}

controller.getUsers =(payload)=>{
  return new Promise((resolve,reject)=>{
    User.find({},function(err,user){
      if(err)
        {
          console.error(err);
          return reject(err);
        }
        else
        {
          console.log(user)
          resolve(user);
        }
    });
  })
}

controller.login = (payload) => {
    return new Promise(async (resolve, reject) => {
      console.log('payload',payload)
      try {
        User.find({ email: payload.email }, function(err, user) {
          if (err) {
            console.error(err);
            return reject(err);
          }
          if (user.length > 0) {
            let foundUser = user[0];
            console.log('foundUser',foundUser)
            bcryptHelper.compare(payload.password, foundUser.password).then(matched => {
            console.log('matched', matched)
              if (matched) {
                let timestamp = Date.now();
                console.log('timestamp',timestamp);
                LogsUser.create({type:'logedin',email:payload.email,timestamp},function(err,small){            
                      if(err)
                      {
                          reject(err);
                      }
                      else
                      {
                        
                        return resolve(small);
                      }
                  })
                resolve(foundUser);
            
              } else {
                resolve('incorrectPassword');
              }
            }).catch(error => {
              console.error(error)
              reject(error);
            });
          } else {
            resolve('userNotFound');
          }
        })
      } catch(err) {
        console.error(err);
        reject(err);
      };
    })
  };
  
module.exports = controller;