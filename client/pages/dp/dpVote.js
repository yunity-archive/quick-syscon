Template.dpVote.helpers({
  title: function() {
    return Proposals.findOne({_id: Session.get("dpVote")}).title;
  },
  proposition: function() {
    return Proposals.findOne({_id: Session.get("dpVote")}).proposition;
  }
});


Template.dpVote.events({
  "click .none": function(event, template){
      var proposal = Proposals.findOne({_id : Session.get('dpVote')});
      var noResUpdate = proposal.noRes;
      // add current user to noRes votes
      noResUpdate.push(Meteor.userId());
      Proposals.update({_id: proposal._id}, { $set: { noRes: noResUpdate } });

      if (proposalVotingComplete()) {
        console.log("all users voted on this prop");
      };
      if (allProposalsVotingComplete()) {
        console.log("all proposals have been voted on");
      };
      Router.go('dp');
  },
  "click .some": function(event, template){
    var proposal = Proposals.findOne({_id : Session.get('dpVote')});
    var someResUpdate = proposal.someRes;
    // add current user to noRes votes
    someResUpdate.push(Meteor.userId());
    Proposals.update({_id: proposal._id}, { $set: { someRes: someResUpdate } });

    if (proposalVotingComplete()) {
      console.log("prop complete");
    };
    if (allProposalsVotingComplete()) {
      console.log("all proposals have been voted on");
    };
      Router.go('dp');
  },
  "click .high": function(event, template){
    var proposal = Proposals.findOne({_id : Session.get('dpVote')});
    var hiResUpdate = proposal.hiRes;
    // add current user to noRes votes
    hiResUpdate.push(Meteor.userId());
    Proposals.update({_id: proposal._id}, { $set: { hiRes: hiResUpdate } });

    if (proposalVotingComplete()) {
      console.log("prop complete");
    };
    if (allProposalsVotingComplete()) {
      console.log("all proposals have been voted on");
    };
      Router.go('dp');
  }
});



function proposalVotingComplete() {
  var topic = Topics.findOne({_id: Session.get("dp")});
  var proposal = Proposals.findOne({_id : Session.get('dpVote')});

  // if the sum of no, some, hi proposal votes somes up all others then this proposal has received full votes
  return isSameSet(proposal.someRes.concat(proposal.hiRes.concat(proposal.noRes)), topic.votingUsers);
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

function isSameSet(arr1, arr2) {
  return  $(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0;
}
