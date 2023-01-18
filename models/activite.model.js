const mongoose = require('mongoose');

const config = require('../config/database');

// activite Schema
const activiteSchema = mongoose.Schema({

    titreActivite: String,
    locatisation: String,
    debutActivite: Date,
    finActivite: Date,
    description: String,
    
});

const activiteModel = module.exports = mongoose.model('activite', activiteSchema, 'activite');
