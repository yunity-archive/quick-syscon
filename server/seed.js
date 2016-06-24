Meteor.startup(function() {
  const topic = {
    text: 'Unity',
    duration: 24
  }
  const proposal = {
    proposition: 'Unity is great',
    choices: [
      {name: 'Yes'},
      {name: 'No'}
    ],
    duration: 24
  }

  if (!Topics.findOne({text: topic.text})) {
    Topics.insert(topic);
  }

  // might insert duplicates
  proposal.topicId = Topics.findOne({text: topic.text})._id;
  Proposals.insert(proposal);

  // if (!Proposals.findOne({topic: proposal.topic})) {
  //   Proposals.insert(proposal);
  // }
});
