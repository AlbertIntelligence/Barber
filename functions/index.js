const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//This function archives every ticket that is deleted from the ticket list
exports.archiveDeletedTickets = functions.database.ref('TicketList/Users/{pushId}')
  .onDelete(event => {
    if (!event.data.exists()) {
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
