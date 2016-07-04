// Check whether any of the started topics has run out of time
Meteor.setInterval(function() {
    var topics = Topics.find();
    topics.forEach(function(topic){
      var startTime = moment(topic.dateCreated);
      var endTime = moment();
      var result = endTime.diff(startTime, 'seconds');

      if (result >= topic.duration * 3600) { // be precise to the level of a second
        topic.votingDone = true;
      }
    });
}, 1000); // call this every 1000ms
