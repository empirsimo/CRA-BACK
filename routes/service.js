var express = require('express');
var router = express.Router();

const config = require('../config/database');
const serviceModel = require('../models/service.model');



/* GET all service ++*/
router.get('/list', function (req, res, next) {

    serviceModel.find(function (err, serviceListResp) {
    if (err) {
      res.send({ status: 500, message: 'Unable to Find service' });
    }
    else {

      const recordCount = serviceListResp.length;
      res.send({ status: 200, recordCount: recordCount, results: serviceListResp });
    }

  });

});



/* Create new Service ++*/
router.post('/add', function (req, res, next) {

  let nomService = req.body.nomService;


  let serviceObj = new serviceModel({

    nomService: nomService

  });

  serviceObj.save(function (err, serviceObj) {

    if (err) {
      res.send({ status: 500, message: 'Unable to add service' });
    }
    else {
      res.send({ status: 200, message: 'service added successfully', serviceDetails: serviceObj });
    }
  });
});


/* Update existing service . ++*/
router.put('/update/:id', function (req, res, next) {

  const service = {
    nomService: req.body.nomService
  };

  serviceModel.findByIdAndUpdate(req.params.id, { $set:service },{ new:true }, (err, data) => {
    if (!err) {

      res.send({ status: 200, message: 'service updated successfully', results: data })
     
    } else {

      res.send({ status: 500, message: 'Unable to update the service' })

    }

  });
});

/* Delete existing Service .++ */
router.delete('/delete', function (req, res, next) {
  const idService = req.query.idService;

  serviceModel.findByIdAndDelete(idService, function (err, serviceResp) {

    if (err) {
      res.send({ status: 500, message: 'Unable to Delete the service' });
    }
    else {
      res.send({ status: 200, message: 'service deleted successfully', results: serviceResp });
    }

  });
});

/* Search existing Service . */
router.get('/search', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
