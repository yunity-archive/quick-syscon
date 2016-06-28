Meteor.startup(function() {
  const group = {
    name: 'Unity1'
  };
  const group2 = {
    name: 'Unity2'
  };
  const group3 = {
    name: 'Unity3'
  };

  if (!Groups.findOne({name: group.name})) {
    Groups.insert(group);
  }
  if (!Groups.findOne({name: group2.name})) {
    Groups.insert(group2);
  }
  if (!Groups.findOne({name: group3.name})) {
    Groups.insert(group3);
  }

  // // might insert duplicates
  // proposal.topicId = Topics.findOne({text: topic.text})._id;
  // Proposals.insert(proposal);

  // if (!Proposals.findOne({topic: proposal.topic})) {
  //   Proposals.insert(proposal);
  // }
});
