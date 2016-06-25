Groups = new Mongo.Collection('groups');

let schema = new SimpleSchema({
  name: {
    type: String,
    max: 50
  }
});

Groups.attachSchema(schema);
Groups.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Groups.before.insert(function(userId, doc) {
  doc.dateCreated = new Date();
});
