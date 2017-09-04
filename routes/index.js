var express = require('express');
var router = express.Router();
var driver_controller = require('../controllers/driverController');
var request_cab_controller = require('../controllers/requestCabController');
var customer_controller = require('../controllers/customerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("Welcome to Cab Booking");
  //   res.redirect('/catalog');
});
router.get('/getAllDriver', driver_controller.getAllDriver);
router.get('/driver/:id', driver_controller.getDriverDetails);
router.post('/createCustomer', customer_controller.createCustomer);
router.post('/requestCab', request_cab_controller.makeCabRequest);
router.post('/acceptCabRequest', request_cab_controller.acceptRequest);
router.get('/getRequestsQueue', request_cab_controller.getRequestsQueue);
router.get('/getAllRequestStatus', request_cab_controller.getAllRequestStatus);
router.post('/completeRequest', request_cab_controller.completeRequest);

module.exports = router;
