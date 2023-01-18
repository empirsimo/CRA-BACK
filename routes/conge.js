var express = require('express');
var router = express.Router();

const config = require('../config/database');
const congeModel = require('../models/conge.model');



/* GET all conge */
router.get('/list', function (req, res, next) {

    congeModel.find(function (err, congeListResp) {
    if (err) {
      res.send({ status: 500, message: 'Unable to Find conge' });
    }
    else {

      const recordCount = congeListResp.length;
      res.send({ status: 200, recordCount: recordCount, results: congeListResp });
    }

  });

});



/* GET Details of a specific conge by user ID */
router.get('/view', function (req, res) {

  const idUser = req.query.idUser;

  congeModel.find({ utilisateur: idUser }, function (err, congeResp) {

    if (err) {
      res.send({ status: 500, message: 'Unable to Find the conge' });
    }
    else {
      res.send({ status: 200, results: congeResp });
    }

  });

});


/* Create new conge . */
router.post('/add', function (req, res, next) {

  let typeConge = req.body.typeConge;
  let dateDebut = req.body.dateDebut;
  let dateFin = req.body.dateFin;
  let dateDemande = req.body.dateDemande;
  let raison = req.body.raison;
  let avis = req.body.avis;
  let utilisateur = req.body.utilisateur;


  let congeObj = new congeModel({

    typeConge: typeConge,
    dateDebut: dateDebut,
    dateFin: dateFin,
    dateDemande: dateDemande,
    raison: raison,
    avis: avis,
    utilisateur: utilisateur

  });

  congeObj.save(function (err, congeObj) {

    if (err) {
      res.send({ status: 500, message: 'Unable to add conge' });
    }
    else {
      res.send({ status: 200, message: 'conge added successfully', congeDetails: congeObj });
    }
  });
});


/* Update existing Conge . */
router.put('/update/:id', function (req, res, next) {

  const conge = {
   typeConge : req.body.typeConge,
   dateDebut : req.body.dateDebut,
   dateFin : req.body.dateFin,
   dateDemande : req.body.dateDemande,
   raison : req.body.raison,
   avis : req.body.avis,
   utilisateur : req.body.utilisateur
  };

  congeModel.findByIdAndUpdate(req.params.id, { $set:conge },{ new:true }, (err, data) => {
    if (!err) {

      res.send({ status: 200, message: 'conge updated successfully', results: data })
     
    } else {

      res.send({ status: 500, message: 'Unable to update the conge' })

    }

  });
});

/* Delete existing Conge . */
router.delete('/delete', function (req, res, next) {
  const idConge = req.query.idConge;

  congeModel.findByIdAndDelete(idConge, function (err, congeResp) {

    if (err) {
      res.send({ status: 500, message: 'Unable to Delete the conge' });
    }
    else {
      res.send({ status: 200, message: 'conge deleted successfully', results: congeResp });
    }

  });
});

/* Search existing Conge . */
router.get('/search', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
