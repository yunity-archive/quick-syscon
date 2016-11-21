Meteor.startup(function() {
  const group = {
    name: 'yunity'
  };
  const group2 = {
    name: 'fstool'
  };
  const group3 = {
    name: 'syscon'
  };
  const group4 = {
    name: 'alpega'
  };
  const group5 = {
    name: 'harmony'
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
  if (!Groups.findOne({name: group4.name})) {
    Groups.insert(group4);
  }
  if (!Groups.findOne({name: group5.name})) {
    Groups.insert(group5);
  }
  // // might insert duplicates
  // proposal.topicId = Topics.findOne({text: topic.text})._id;
  // Proposals.insert(proposal);

  // if (!Proposals.findOne({topic: proposal.topic})) {
  //   Proposals.insert(proposal);
  // }
});
