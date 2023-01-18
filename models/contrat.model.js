const mongoose = require('mongoose');

const config = require('../config/database');

// contrat Schema
const contratSchema = mongoose.Schema({

    typeContrat: String,
    nbrHeure: Number,
    salaireBrut: Number,
    nbrConges: Number,
    utilisateur: String,
    
});

const contratModel = module.exports = mongoose.model('contrat', contratSchema, 'contrat');
