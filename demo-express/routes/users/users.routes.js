var express = require('express');
var router = express.Router();
var controller = require('./users.controller');

/* GET users listing. */

router.get('/list', function(req, res, next) {
  controller.getUsers(req.body).then(result => {
    return res.status(200).send({
      success: true,
      error: null,
      msg: 'List of All Registered Users',
      list: result
    });
  },err => {
    res.status(500).send({
      success: false,
      error: 'internal server Error',
      msg: err
    });
  });
});


router.post('/register', function(req, res, next) {
  controller.register(req.body).then(result => {
    if(result === 'AlreadyRegistered'){
      return res.status(400).send({
        success: false,
        error: null,
        msg: 'That user Already Registered'
      }); 
    }
    return res.status(200).send({
      success: true,
      error: null,
      msg: 'Registered'
    });
  }, err => {
    res.status(500).send({
      success: false,
      error: 'internal server error',
      msg: err
    });
  });
});

  router.post('/login', function(req, res, next) {
    controller.login(req.body).then(result => {
      if (result === 'incorrectPassword') {
        return res.status(403).send({
          success: false,
          error: null,
          msg: 'incorrect Password'
        });
      } else if (result === 'userNotFound') {
        return res.status(404).send({
          success: false,
          error: null,
          msg: 'No user registered with this email'
        });
      } else {
        return res.status(200).send({
          success: true,
          error: null,
          msg: 'signed in success'
        });
      }
    }, err => {
      return res.status(500).send({
        success: false,
        error: 'internal server error',
        msg: err
      });
    });
  });

module.exports = router;
