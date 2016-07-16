serverMessages = new ServerMessages();

if (Meteor.isServer) {
  Meteor.methods({
    notify: function (title, msg) {
      serverMessages.notify('serverMessage:info', title, msg, {});
      // serverMessages.notify.apply(serverMessages, arguments);
    }
  });
}

/*
 when users change - adapt all topic.votingUsers properties accordingly
*/
Meteor.users.find().observe({
  added: function(user) {
    console.log("____added");
    console.log("user:" , user);

    // register all users on topic TODO later only group
    registerAllUsers();
  },
  removed: function() {
    console.log("___rm");
    registerAllUsers();
  }
});

function registerAllUsers() {
  var allUsers = [];
  var users = Meteor.users.find();
  users.forEach(function(u){
    allUsers.push(u._id);
  });
  console.log(allUsers);
  Topics.update({}, { $set: { votingUsers: allUsers } }, {multi: true});
}
