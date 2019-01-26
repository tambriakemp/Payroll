const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Dependent } = require('../models/dependent') //connects to the user model

router.get('/', function(req, res) {
    Dependent.find()
      .then(docs => res.json(docs))
      .catch(err => {
            console.error(err); 
            res.status(500).json({message: 'Internal Server Error'})
          });
      
  });





module.exports = router;  