var express = require('express');
var router = express.Router();
const cors = require('cors');

var MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');
const app = express();
var url = "mongodb://localhost:27017/";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(5000, function () {
    console.log('listening on 5000')
})
app.use(express.static(__dirname))



MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("MeanCRA");
  app.use(cors({origin:"http://localhost:4200"}))
  app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD");
      next();
  }); 

  app.post("/GetData", (req, res) => {
    
    console.log(req.body);
    const idU = req.body.IdUser;

      dbo.collection('activiteData').find({IdUser: idU }).toArray((err, cus) => {
          res.send(cus);
      });
  });

  app.post("/GetAllData", (req, res) => {
    dbo.collection('activiteData').find({}).toArray((err, cus) => {
        res.send(cus);
    });
});


  app.post("/BatchData", (req, res) => {
      console.log(req.body);
      var eventData = [];
      if (req.body.action == "insert" || (req.body.action == "batch" && req.body.added.length > 0)) {
          (req.body.action == "insert") ? eventData.push(req.body.value) : eventData = req.body.added;
          for (var i = 0; i < eventData.length; i++) {


            eventData[i].Subject = eventData[i].Subject;
            eventData[i].Description =  eventData[i].Description;
            eventData[i].StartTime = eventData[i].StartTime;
            eventData[i].EndTime = eventData[i].EndTime;
            eventData[i].Location = eventData[i].Location;
            eventData[i].IdUser = eventData[i].IdUser;

              // var sdate = new Date(eventData[i].StartTime);
              // console.log("sdate :"+sdate);
              // var edate = new Date(eventData[i].EndTime);
              // console.log("edate :"+edate);
              // eventData[i].StartTime = (new Date(+sdate - (sdate.getTimezoneOffset() * 60000)));
              // eventData[i].EndTime = (new Date(+edate - (edate.getTimezoneOffset() * 60000)));
              dbo.collection('activiteData').insertOne(eventData[i]);

          }
      }
      if (req.body.action == "update" || (req.body.action == "batch" && req.body.changed.length > 0)) {
          (req.body.action == "update") ? eventData.push(req.body.value) : eventData = req.body.changed;
          for (var i = 0; i < eventData.length; i++) {
              delete eventData[i]._id;


            eventData[i].Subject = eventData[i].Subject;
            eventData[i].Description =  eventData[i].Description;
            eventData[i].StartTime = eventData[i].StartTime;
            eventData[i].EndTime = eventData[i].EndTime;
            eventData[i].Location = eventData[i].Location;
            eventData[i].IdUser = eventData[i].IdUser;
              // var sdate = new Date(eventData[i].StartTime);

              // var edate = new Date(eventData[i].EndTime);

              // eventData[i].StartTime = (new Date(+sdate - (sdate.getTimezoneOffset() * 60000)));
              
              // eventData[i].EndTime = (new Date(+edate - (edate.getTimezoneOffset() * 60000)));
              dbo.collection('activiteData').updateOne({ "Id": eventData[i].Id }, { $set: eventData[i] });
          }
      }
      if (req.body.action == "remove" || (req.body.action == "batch" && req.body.deleted.length > 0)) {
          (req.body.action == "remove") ? eventData.push({ Id: req.body.key }) : eventData = req.body.deleted;
          for (var i = 0; i < eventData.length; i++) {
              dbo.collection('activiteData').deleteOne({ "Id": eventData[i].Id });
          }
      }
      res.send(req.body);
  });
});

module.exports = router;