AutoForm.setDefaultTemplate('semanticUI');

serverMessages.listen('serverMessage:info', function (subject, message, options) {
    Notifications.info(subject, message, options);
  });

serverMessages.listen('serverMessage:warning', function (subject, message, options) {
  Notifications.warn(subject, message, options);
});

serverMessages.listen('serverMessage:success', function (subject, message, options) {
  Notifications.success(subject, message, options);
});

serverMessages.listen('serverMessage:error', function (subject, message, options) {
  Notifications.error(subject, message, options);
});

// Global helper
Template.registerHelper("activeGroup", function (param2) {
    return Session.get('activeGroup');
});

Meteor.startup(function(){
  Session.set('activeGroup', Groups.find().fetch()[0].name);
});
