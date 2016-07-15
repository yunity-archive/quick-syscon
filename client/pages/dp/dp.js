Template.dp.helpers({
  topic: function() {
    return Topics.findOne({_id: Session.get("dp")}).text;
  },
  proposals: function() {
    return Proposals.find({topicId: Session.get("dp")});
  },
  stateColor: function() {
    if (this.noRes && this.noRes.indexOf(Meteor.userId()) >= 0) {
      return "no-resistance";
    }
    if (this.someRes && this.someRes.indexOf(Meteor.userId()) >= 0) {
      return "some-resistance";
    }
    if (this.hiRes && this.hiRes.indexOf(Meteor.userId()) >= 0) {
      return "hi-resistance";
    }
    return "normal-card";
  },
  allProposalsVotingComplete: function() {
    return allProposalsVotingComplete();
  }
});

Template.dp.events({
  "click .proposal": function(event, template){
      Session.set("dpVote", this._id);
      Router.go('dpVote');
  },
  "click .create-proposal": function(event, template){
      Router.go('proposalCreate');
  },
  "click .result-card": function(event, template){
      Router.go('result');
  }
});

// function alreadyVotedOnProposal(proposal) {
//   return ((proposal.noRes.indexOf(Meteor.userId()) >= 0) || (proposal.someRes.indexOf(Meteor.userId()) >= 0)
//   || (proposal.hiRes.indexOf(Meteor.userId()) >= 0));
// }


function isSameSet(arr1, arr2) {
  return  $(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0;
}

function allProposalsVotingComplete() {
  var topic = Topics.findOne({_id: Session.get("dp")});
  var proposals = Proposals.find({topicId : Session.get('dp')});

  var proposalVotingComplete = 0;
  proposals.forEach(function(p){
    if (isSameSet(p.someRes.concat(p.hiRes.concat(p.noRes)), topic.votingUsers)) {
      proposalVotingComplete += 1;
    };
  });
  return (proposalVotingComplete == proposals.count());
}
