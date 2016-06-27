serverMessages = new ServerMessages();

if (Meteor.isServer) {
  Meteor.methods({
    notify: function (title, msg) {
      serverMessages.notify('serverMessage:info', title, msg, {});
      // serverMessages.notify.apply(serverMessages, arguments);
    }
  });
}
