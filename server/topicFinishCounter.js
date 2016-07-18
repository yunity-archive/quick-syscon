// Check whether any of the started topics has run out of time
Meteor.setInterval(function() {
    var topics = Topics.find();
    topics.forEach(function(topic){
      var startTime = moment(topic.dateCreated);
      var endTime = moment();
      var result = endTime.diff(startTime, 'seconds');

      if (result >= topic.duration * 3600) { // be precise to the level of a second
        Topics.update(topic._id, { $set: { votingState: "archive"} });
          // TODO SLACK_TOPIC_TIME_RUNUP();
      }
    });
}, 1000); // call this every 1000ms

  // TODO SLACK_TOPIC_CREATE();
  // TODO SLACK_TOPIC_TIME_RUNUP();

  // 1) result nicht anonym machen - toggle button
  // 2) if result -
