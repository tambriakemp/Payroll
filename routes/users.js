const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User } = require('../models/user') //connects to the user model


router.get('/', function(req, res) {
  User.find()
    .then(docs => res.json(docs))
    .catch(err => {
          console.error(err); 
          res.status(500).json({message: 'Internal Server Error'})
        });
    
});

module.exports = router;  