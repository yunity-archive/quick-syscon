serverMessages = new ServerMessages();

if (Meteor.isServer) {
  Meteor.methods({
    notify: function () {
      serverMessages.notify('serverMessage:info', 'test', 'test', {});
      // serverMessages.notify.apply(serverMessages, arguments);
    }
  });
}
