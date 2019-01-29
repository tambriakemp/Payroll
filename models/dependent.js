'use strict';

const mongoose = require('mongoose');

const schema =  mongoose.Schema({
    // _id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
    relationship: String,
    employee: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee'}],
      
});

schema.methods.serialize = function() {
    return {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      relationship: this.relationship,
    //   employee: this.employee

    //   address: {address.this.street},

    };
  };

const Dependent = mongoose.model('Dependent', schema, 'dependents');

module.exports = { Dependent }; 