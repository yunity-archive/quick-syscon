Votes = new Meteor.Collection('votes');

let schema = new SimpleSchema({
  proposalId: {
    type: String
  },
  author: {
    type: String
  },
  value: {
    type: String
  },
  dateCreated: {
    type: Date,
    optional: true
  }
});

Votes.attachSchema(schema);
Votes.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

if (Meteor.isServer) {
  // Remove all votes associated with a proposal.
  Proposals.after.remove(function(userId, doc) {
    Votes.remove({proposalId: doc._id});
  });

  // Remove previous votes by the same use for the same proposal.
  Votes.before.insert(function(userId, doc) {
    Votes.remove({proposalId: doc.proposalId, author: doc.author});
    doc.dateCreated = new Date();
  });
}
