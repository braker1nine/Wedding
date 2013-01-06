WeddingParty = new Meteor.Collection("weddingparty");


if (Meteor.isClient) {
  /*Template.hello.greeting = function () {
    return "Welcome to weddingMeteor.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    // Create the database
    if (WeddingParty.find().count() == 0) {
      console.log("NO WEDDING PARTY")
    }

  });
}
