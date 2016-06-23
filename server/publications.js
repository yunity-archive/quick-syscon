Meteor.publish('proposals', () => Proposals.find());
Meteor.publish('votes', () => Votes.find());
