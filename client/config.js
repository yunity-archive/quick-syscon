AutoForm.setDefaultTemplate('semanticUI');

serverMessages.listen('serverMessage:info', function (subject, message, options) {
    Notifications.info(subject, message, options);
});
