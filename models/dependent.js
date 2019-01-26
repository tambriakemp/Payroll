'use strict';

const mongoose = require('mongoose');

const schema =  mongoose.Schema({
    // _id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
    dependentType: String,
    employee: [{type: mongoose.Schema.Types.ObjectId, ref: 'employees'}],
      
});



const Dependent = mongoose.model('Dependent', schema, 'dependents');

module.exports = { Dependent }; 