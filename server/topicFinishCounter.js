Meteor.setInterval(function() {
  //  serverMessages.notify('serverMessage:info', 'test', 'test', {});

    var topics = Topics.find();
    topics.forEach(function(topic){
      // console.log(topic.text);
    });
    // Topics.find({"createdAt" : { $gte : new ISODate("2012-01-12T20:15:31Z") }});
    // Topics.find({}, {sort: {'dateCreated': -1}});
}, 5000);
