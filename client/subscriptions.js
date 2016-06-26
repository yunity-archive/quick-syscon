Meteor.subscribe("topics");
Meteor.subscribe("proposals");
Meteor.subscribe("votes");

Meteor.subscribe('usersCount', [], function() {
    console.log('subscribed.');
});
