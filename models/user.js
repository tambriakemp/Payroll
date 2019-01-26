'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    local: {
        username: String,
        password: String,
    }
});

const User = mongoose.model('User', schema, 'users');

module.exports = { User }; 