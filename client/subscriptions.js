Meteor.subscribe("groups", function(){
  Session.set('activeGroup', Groups.find().fetch()[0].name);
});
Meteor.subscribe("topics");
Meteor.subscribe("proposals");
Meteor.subscribe("votes");

Meteor.subscribe('usersCount', [], function() {
    // console.log('subscribed.');
});
