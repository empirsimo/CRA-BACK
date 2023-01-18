const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const UserModel = require('../models/user.model');
//Dans cette partie on crée 4 méthodes les plus utilisables ( la modif + la suppression + add + get )
// Register
router.post('/register', (req, res, next) => {
  let newUser = new UserModel({
    nom: req.body.nom,
    email: req.body.email,
    prenom: req.body.prenom,
    password: req.body.password,
    userRole: req.body.userRole,
  });

  UserModel.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});



// Login
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  UserModel.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: "Email non trouvé"});
    } 

    UserModel.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 semaine (en seconde)
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            userRole: user.userRole
          }
        });
      } else {
        return res.json({success: false, msg: "Mauvais mot de passe"});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//get all users ++
router.get('/usersall', function(req, res, next){
  
  UserModel.find(function(err, userListResp){
    if(err){
      res.send({status: 500, message: 'Unable to Find users'});
            }
      else{

        const recordCount = userListResp.length;
      res.send({status: 200,recordCount:recordCount , results: userListResp});
          }

  });

});

/* Update existing User . ++*/
router.put('/update/:id', function (req, res, next) {

  const user = {

    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    telephone: req.body.telephone,
    civilite: req.body.civilite,
    pays_adresse: req.body.pays_adresse,
    ville_adresse: req.body.ville_adresse,
    rue_adresse: req.body.rue_adresse,
    num_adresse: req.body.num_adresse,
    postal_adresse: req.body.postal_adresse,
    userRole: req.body.userRole,
    idService: req.body.idService
  };

  UserModel.findByIdAndUpdate(req.params.id, { $set:user },{ new:true }, (err, data) => {
    if (!err) {

      res.send({ status: 200, message: 'user updated successfully', results: data })
     
    } else {

      res.send({ status: 500, message: 'Unable to update the user' })

    }

  });
});

/* Delete existing User .++*/
router.delete('/delete', function (req, res, next) {
  const idUser = req.query.idUser;

  UserModel.findByIdAndDelete(idUser, function (err, userResp) {

    if (err) {
      res.send({ status: 500, message: 'Unable to Delete the user' });
    }
    else {
      res.send({ status: 200, message: 'user deleted successfully', results: userResp });
    }

  });
});

/* Search existing User . */
router.get('/search', function (req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;