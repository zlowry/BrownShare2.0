Rides = new Mongo.Collection("rides");

if (Meteor.isClient) {

  Template.body.helpers({
    rides: function () {
      return Rides.find();
    }
  });


  Template.riderequest.events({
    'submit form': function (event) {
      
      //prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var destination = event.target.destination.value;
      var source = event.target.source.value;

      // Insert a task into the collection
      Meteor.call("insertRide", destination, source);
 
      // Clear form
      event.target.destination.value = "";
      event.target.source.value = "";
    },

    'click li': function(event) {
      
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  insertRide: function (destination, source) {
    Rides.insert({
      destination: destination,
      source: source,
      createdAt: new Date()
    });
  }
});
