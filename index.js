var stripe = require("stripe")("sk_test_tpF8KRd8RfbX6bR7qi9Z0xWf");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Create a customer id to save it in db
app.post('/createUser', function (request, response) {
  var token = request.body.stripetoken;
  var email = request.body.email;

  // Create a Customer:
  stripe.customers.create({
    email: email,
    source: token,
  }).then(function(customer) {
    console.log('User created');
    response.send(customer.id);
  });
});

//Proceed to payment
app.post('/pay', function (request, response) {
  var customerId = request.body.customerId;
  var amountpayable = request.body.amount;

  stripe.charges.create({
    amount: amountpayable,
    currency: "cad",
    customer: customerId,
  }).then(function(charge) {
    var amountPaid = amountpayable / 100;
    console.log(amountPaid + "$ payment completed.");
  }).catch(function(err) {
    // Deal with an error
    console.log('Error: ' + err);
  });
});

app.use(router);
app.listen(3333, function () {
    console.log('Server started');
})
