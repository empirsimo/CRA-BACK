const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../config/database');

// user Schema
const userSchema = mongoose.Schema({

    nom: String,
    prenom: String,
    email: String,
    password: String,
    telephone: String,
    civilite: String,
    pays_adresse: String,
    ville_adresse: String,
    rue_adresse: String,
    num_adresse: Number,
    postal_adresse: Number,
    userRole: String,
    idService: String
    
});

const UserModel = module.exports = mongoose.model('user', userSchema, 'utilisateur');

module.exports.getUserById = function(id, callback){
  UserModel.findById(id, callback);
  }
  
  module.exports.getUserByEmail = function(email, callback){
    const query = {email: email}
    UserModel.findOne(query, callback);
  }
  
  module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }
  