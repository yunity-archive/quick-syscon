Template.archive.helpers({
  topics: function() {
    var group = Groups.findOne({name: Session.get('activeGroup')});
    if (group)
      return Topics.find({group : group._id, votingState: "archive"}, {sort: {'dateCreated': -1}});
  },
  sinceCreated: function() {
    return moment(this.dateCreated).fromNow();
  },
  votingStateColor: function() {
    if (this.votingState == "voting-done")
      return "voting-done";

    var proposal = Proposals.findOne({topicId: this._id, title: "1st proposal"});
    if (proposal)
      if (proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()) >= 0)
        return "my-voting-done";

    return "";
  },
  currentVotes: function() {
    var proposal = Proposals.findOne({topicId: this._id, title: "1st proposal"});
    var plusVotes;
    var minusVotes;
    if (proposal) {
      if (proposal.plusVotes) plusVotes = proposal.plusVotes.length;
      if (proposal.minusVotes) minusVotes = proposal.minusVotes.length;
    }
    return (plusVotes + minusVotes);
  },
  totalVotes: function() {
    return Topics.findOne({_id: this._id}).votingUsers.length;
  },
  ownTopic: function() {
    return (Topics.findOne({_id: this._id}).owner === Meteor.userId());
  }
});

Template.archive.events({
  'click .card': function(){
      Router.go('result');
  }
});
