const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


admin.initializeApp(functions.config().firebase);
var wrotedata;
exports.Pushtrigger = functions.database.ref('/Messages/live').onWrite((event) => {
    wrotedata = event.data.val();

    admin.database().ref('/Users').once('value').then((users) => {
        var rawtokens = users.val();
        var tokens = [];
        processtokens(rawtokens).then((processedtokens) => {

          for (var token of processedtokens) {
              if (token.deviceToken != undefined && token.pushNotification == true) tokens.push(token.deviceToken);
          }

          var payload = {

                  "notification":{
                      "title":"Mario Perfect Cut",
                      "body":wrotedata,
                      "sound":"default",
                      },
                  "data":{
                      "sendername":"Mario Perfect Cut",
                      "message":wrotedata
                  }
          }

          return admin.messaging().sendToDevice(tokens, payload).then((response) => {
              console.log('Pushed notifications');
          }).catch((err) => {
              console.log(err);
          });
        });
    });
});

exports.pushWaitingLineUpdate = functions.database.ref('/Users/{pushId}/waitingLine')
  .onUpdate((event) => {
    if (event.data.previous.val() != event.data.val()) {
      var userId = event.params.pushId;
      admin.database().ref('/Users').once('value').then((users) => {
        var rawtokens = users.val();
        processtokens(rawtokens).then((processedtokens) => {

          for (var token of processedtokens) {
            var tokens = [];
              if (token.deviceToken != undefined &&
                  token.pushNotification == true &&
                  token.UserId == userId) {

                  tokens.push(token.deviceToken);
                  var payload = {

                          "notification":{
                              "title":"Mario Perfect Cut",
                              "body":"Nombre de clients avant vous dans la file d'attente: " + token.waitingLine,
                              "sound":"default",
                              },
                          "data":{
                              "sendername":"Mario Perfect Cut",
                              "message":"Nombre de clients avant vous dans la file d'attente: " + token.waitingLine,
                          }
                  }

                  return admin.messaging().sendToDevice(tokens, payload).then((response) => {
                      console.log('Pushed notifications');
                  }).catch((err) => {
                      console.log(err);
                  });
              }
          }
        });
      });
    }
});

/*
exports.pushTicketListUpdate = functions.database.ref('TicketList/Users/{pushId}')
  .onCreate((event) => {
  if (event.data.exists()) {
    var newUserId = event.data.val().uid;
    admin.database().ref('/Users').once('value').then((users) => {
        var rawtokens = users.val();
        var tokens = [];
        var payloads = [];

        processtokens(rawtokens).then((processedtokens) => {

          for (var token of processedtokens) {
            var tokens = [];
              if (token.deviceToken != undefined &&
                  token.pushNotification == true &&
                  token.UserId != newUserId) {
                    tokens.push(token.deviceToken);
                    var payload = {

                            "notification":{
                                "title":"Mario Perfect Cut",
                                "body":"Nombre de clients avant vous dans la file d'attente: " + token.waitingLine,
                                "sound":"default",
                                },
                            "data":{
                                "sendername":"Mario Perfect Cut",
                                "message":"Nombre de clients avant vous dans la file d'attente: " + token.waitingLine,
                            }
                    }

                    admin.messaging().sendToDevice(tokens, payload).then((response) => {
                        console.log('Pushed notifications');
                    }).catch((err) => {
                        console.log(err);
                    });
                  }
          }
        });
    });
  }
});*/

function processtokens(rawtokens) {
    var promise = new Promise((resolve, reject) => {
         var processedtokens = []
    for (var token in rawtokens) {
        processedtokens.push(rawtokens[token]);
    }
    resolve(processedtokens);
    })
    return promise;
}

//This function archives every ticket that is deleted from the ticket list
exports.archiveDeletedTickets = functions.database.ref('TicketList/Users/{pushId}')
  .onDelete(event => {

    if (!event.data.exists()) {
      /*var newUserId = event.data.previous.val().uid;
      admin.database().ref('/Users').once('value').then((users) => {
          var rawtokens = users.val();
          var tokens = [];
          var payloads = [];

          processtokens(rawtokens).then((processedtokens) => {

            for (var token of processedtokens) {
              var tokens = [];
                if (token.deviceToken != undefined &&
                    token.pushNotification == true &&
                    token.UserId != newUserId) {
                      tokens.push(token.deviceToken);
                      var payload = {

                              "notification":{
                                  "title":"Mario Perfect Cut",
                                  "body":"Nombre de clients avant vous dans la file d'attente: " + token.waitingLine,
                                  "sound":"default",
                                  },
                              "data":{
                                  "sendername":"Mario Perfect Cut",
                                  "message":"Nombre de clients avant vous dans la file d'attente: " + token.waitingLine,
                              }
                      }

                      admin.messaging().sendToDevice(tokens, payload).then((response) => {
                          console.log('Pushed notifications');
                      }).catch((err) => {
                          console.log(err);
                      });
                    }
            }
          });
      });*/

      event.data.ref.parent.parent.parent.child('TicketsArchive/')
      .child('Users').update({
        [event.data.previous.val().timeStamp]: event.data.previous.val()
      });
    }
  });

//This function archives every appointment that is deleted from the appointment list
exports.archiveDeletedAppointments = functions.database.ref('Appointments/Users/{pushId}')
  .onDelete(event => {
    if (!event.data.exists()) {
      event.data.ref.parent.parent.parent.child('AppointmentsArchive/')
      .child('Users').update({
        [event.params.pushId]: event.data.previous.val()
      });
    }
  });
