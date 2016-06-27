Meteor.startup(function() {
  const group = {
    name: 'Unity'
  }

  if (!Groups.findOne({name: group.name})) {
    Groups.insert(group);
  }

  // // might insert duplicates
  // proposal.topicId = Topics.findOne({text: topic.text})._id;
  // Proposals.insert(proposal);

  // if (!Proposals.findOne({topic: proposal.topic})) {
  //   Proposals.insert(proposal);
  // }
});
