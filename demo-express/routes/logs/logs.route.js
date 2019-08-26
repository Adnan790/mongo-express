var express = require('express');
var router = express.Router();
var controller = require('./logs.controller');


router.get('/email',function (req,res, next) {
 controller.getLoginUser(req.body).then(result=>{
     return res.status(200).send({
         msg:'List of login users',
         list:result
     });
 },err=>{
    res.status(500).send({
        success: false,
        error: 'internal server Error',
        msg: err
      });
 });    
})

module.exports = router;