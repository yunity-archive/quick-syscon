// on startup we publish all collections - // Meteor.startup() runs AFTER this code!
Meteor.publish("topics", () => {
  return Topics.find();
});
Meteor.publish("proposals", () => {
  return Proposals.find();
});
Meteor.publish("votes", () => {
  return Votes.find();
});

Meteor.publish("usersCount", function () {
    return Meteor.users.find();
});
