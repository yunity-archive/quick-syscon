Proposals = new Mongo.Collection('proposals');

const ChoiceSchema = new SimpleSchema({
  name: {
    type: String
  }
});

let schema = new SimpleSchema({
  topicId: {
    type: String,
    max: 100
  },
  title: {
    type: String,
    max: 50
  },
  proposition: {
    type: String,
    max: 500
  },
  // for dp voting
  hiRes: {
    type: [String],
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    },
  },
  someRes: {
    type: [String],
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    },
  },
  noRes: {
    type: [String],
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    },
  },
  // only for firstProposal voting
  plusVotes: {
    type: [String],
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    },
  },
  minusVotes: {
    type: [String],
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    }
  }
  // choices: {
  //   type: [ChoiceSchema],
  //   minCount: 1,
  //   optional: true
  // }
});

Proposals.attachSchema(schema);
Proposals.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Proposals.before.insert(function(userId, doc) {
  doc.dateCreated = new Date();
});
