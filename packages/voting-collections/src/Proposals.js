Proposals = new Meteor.Collection('proposals');

const ChoiceSchema = new SimpleSchema({
  name: {
    type: String
  }
});

let schema = new SimpleSchema({
  name: {
    type: String,
    max: 100
  },
  description: {
    type: String,
    max: 500
  },
  dateCreated: {
    type: Date,
    optional: true
  },
  choices: {
    type: [ChoiceSchema],
    minCount: 1
  }
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
