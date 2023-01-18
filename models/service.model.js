const mongoose = require('mongoose');

const config = require('../config/database');

// service Schema
const serviceSchema = mongoose.Schema({

    nomService: String
    
});

const serviceModel = module.exports = mongoose.model('service', serviceSchema, 'service');
