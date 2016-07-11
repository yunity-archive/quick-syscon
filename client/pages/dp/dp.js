Template.dp.helpers({
  topic: function() {
    return Topics.findOne({_id: Session.get("dp")}).text;
  },
  proposals: function() {
    return Proposals.find({topicId: Session.get("dp")});
  },
  stateColor: function() {
    if (this.noRes.indexOf(Meteor.userId()) >= 0) {
      return "no-resistance";
    }
    if (this.someRes.indexOf(Meteor.userId()) >= 0) {
      return "some-resistance";
    }
    if (this.hiRes.indexOf(Meteor.userId()) >= 0) {
      return "hi-resistance";
    }
  }
});

Template.dp.events({
  "click .proposal": function(event, template){
      if (!alreadyVotedOnProposal(this)) {
        Session.set("dpVote", this._id);
        Router.go('dpVote');
      }
      else {
        alert("already voted");
      }
  },
  "click .create-proposal": function(event, template){
      Router.go('proposalCreate');
  }
});

function alreadyVotedOnProposal(proposal) {
  return ((proposal.noRes.indexOf(Meteor.userId()) >= 0) || (proposal.someRes.indexOf(Meteor.userId()) >= 0)
  || (proposal.hiRes.indexOf(Meteor.userId()) >= 0));
}
