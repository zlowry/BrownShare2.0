Rides = new Mongo.Collection("rides");

if (Meteor.isClient) {

  Template.ridedisplay.helpers({
    rides: function () {
      return Rides.find();
    },
    selectedRide: function() {
      var rideId = this._id;
      var selectedRide = Session.get('selectedRide');
      if(rideId == selectedRide){
        return "selected"
      }
    }
  });


  Template.riderequest.events({
    'submit form': function (event) {
      
      //prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var destination = event.target.destination.value;
      var source = event.target.source.value;
      var date = event.target.date.value;
      var time = event.target.time.value;

      // Insert a task into the collection
      Meteor.call("insertRide", destination, source, date, time);
 
      // Clear form
      event.target.destination.value = "";
      event.target.source.value = "";
      event.target.date.value = "";
      event.target.time.value = "";
    }
  });

  Template.ridedisplay.events({
    'click .eachride': function(event) {
      var rideId = this._id;
      Session.set('selectedRide', rideId);
      //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
      $("#contact").slideToggle();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  insertRide: function (destination, source, date, time) {
    Rides.insert({
      destination: destination,
      source: source,
      date: date,
      time: time,
      createdAt: new Date()
    });
  }
});
