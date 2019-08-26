var controller = {};
const bcrypt = require('bcrypt');
const saltRounds = 2;

controller.getHash = (input)=>{
    return new Promise((resolve, reject) =>{
        bcrypt.hash(input, saltRounds,function (err , hash) {
            if(!err)
            {
                return resolve(hash);
            }
            else
            {
                reject(err);
            }
            
        });
    });
};

controller.compare=(pass,hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(pass, hash, function (err, res) {
            if(err)
            {
                return reject(false);
            }
            else if(res)
            {
                return resolve(true);
            }
            else
            {
                return resolve(false);
            }
            
        });
    })
}
module.exports = controller;