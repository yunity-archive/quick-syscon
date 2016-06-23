Meteor.startup(function() {
  const proposal = {
    topic: 'Demo Proposal',
    description: 'Unity is great',
    choices: [
      {name: 'Yes'},
      {name: 'No'}
    ],
    duration: 24
  }

  if (!Proposals.findOne({topic: proposal.topic})) {
    Proposals.insert(proposal);
  }
});
