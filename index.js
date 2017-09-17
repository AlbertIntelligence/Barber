var stripe = require("stripe")("sk_test_tpF8KRd8RfbX6bR7qi9Z0xWf");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/processpay', function (request, response) {
    var stripetoken = request.body.stripetoken;
    var amountpayable = request.body.amount;

    stripe.customers.create({
      email: 'foo-customer@example.com'
    }).then(function(customer) {
      return stripe.customers.createSource(customer.id, {
        source: 'tok_visa'
      });
    }).then(function(source) {
      return stripe.charges.create({
        amount: amountpayable,
        currency: 'cad',
        customer: source.customer
      });
    }).then(function(charge) {
      // New charge created on a new customer
      var amoutPaid = amountpayable / 100;
      console.log(amoutPaid + '$ payment completed.');

    }).catch(function(err) {
      // Deal with an error
      console.log('error: ' + err);
    });
})

app.use(router);
app.listen(3333, function () {
    console.log('Server started');
})
