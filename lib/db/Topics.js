Topics = new Mongo.Collection('topics');

let schema = new SimpleSchema({
  owner: {
    type: String,
    autoform: {
      type: "hidden",
      label: false
    }
  },
  text: {
    type: String,
    max: 500
  },
  firstProposal: {
    type: String,
    max: 500
  },
  duration: {
    type: Number,
    min: 1,
    max: 24
  },
  votingUsers: {
    type: [String],
    autoform: {
      type: "hidden",
      label: false
    }
  },
  votingDone: {
    optional: true,
    type: Boolean,
    autoform: {
      type: "hidden",
      label: false
    }
  }
});

Topics.attachSchema(schema);
Topics.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Topics.before.insert(function(userId, doc) {
  doc.dateCreated = new Date();
});
