Rides = new Mongo.Collection("rides");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    rides: function () {
      
    },
  });


  Template.body.events({
    "submit .new-ride": function (event) {
      
      //prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var destination = event.target.text.value;

      //console.log(destination);

      // Insert a task into the collection
      //Meteor.call("createRide", destination);
 
      // Clear form
      event.target.text.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  createRide: function (destination) {
    console.log(destination);
  }
});
