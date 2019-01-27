'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');

const { User } = require('../models/user') //connects to the user model


// router.get('/', function(req, res) {
//   User.find()
//     .then(docs => res.json(docs))
//     .catch(err => {
//           console.error(err); 
//           res.status(500).json({message: 'Internal Server Error'})
//         });
    
// });


// const config = require('../config');

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});



module.exports = router;  