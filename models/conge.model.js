const mongoose = require('mongoose');

const config = require('../config/database');

// conge Schema
const congeSchema = mongoose.Schema({

    
    typeConge: String,
    dateDebut: Date,
    dateFin: Date,
    dateDemande: Date,
    raison: String,
    avis: String,
    utilisateur: String,
    
});

const congeModel = module.exports = mongoose.model('conge', congeSchema, 'conge');