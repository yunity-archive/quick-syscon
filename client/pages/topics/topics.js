Template.topics.helpers({
  topics: () => Topics.find({}, {sort: {'dateCreated': -1}})
  // votes: function() {
  //   return Votes.find({proposalId: this._id}).count();
  // }
});
