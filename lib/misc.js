serverMessages = new ServerMessages();

if (Meteor.isServer) {
  Meteor.methods({
    notify: function () {
      serverMessages.notify.apply(serverMessages, arguments);
    }
  });
}
