Template.topicVote.helpers({
    topic: function(){
       return Topics.findOne({_id: Session.get('topicVote')}).text;
    },
    proposal: function(){
       return Topics.findOne({_id: Session.get('topicVote')}).firstProposal;
    }
});

Template.topicVote.events({
    'click .ok': function(){
      // check how many group (or users here with one group) members we have....
      // this is dynamic as users might join later - then they become topic listener
      var proposal = Proposals.findOne({topicId: Session.get('topicVote')});
      var plusVotesUpdate = proposal.plusVotes;
      // add current user to plus votes
      plusVotesUpdate.push(Meteor.userId());
      Proposals.update({_id: proposal._id}, { $set: { plusVotes: plusVotesUpdate } });

      if (votingComplete()) {
        Session.set('topicQuickResult', Session.get('topicVote'));
        Session.set('topicVote', undefined);
        Router.go('topicQuickResult');
      }
      else {
        Session.set('topicVote', undefined);
        Router.go('topics');
      }
    },
    'click .no': function(){
      var proposal = Proposals.findOne({topicId: Session.get('topicVote')});
      var minusVotesUpdate = proposal.minusVotes;
      // add current user to minus votes
      minusVotesUpdate.push(Meteor.userId());
      Proposals.update({_id: proposal._id}, { $set: { minusVotes: minusVotesUpdate } });

      if (votingComplete()) {
        // TODO consider id passing by template routing and/or template subscriptions
        // this session nightmere is to garantuee that no one enters view via back button
        // and revotes!
        Session.set('topicQuickResult', Session.get('topicVote'));
        Session.set('topicVote', undefined);
        Router.go('topicQuickResult');
      }
      else {
        Session.set('topicVote', undefined);
        Router.go('topics');
      }
    }
});

function votingComplete() {
  var topic = Topics.findOne({_id: Session.get('topicVote')});
  var proposal = Proposals.findOne({topicId: Session.get('topicVote')});

  return isSameSet(proposal.minusVotes.concat(proposal.plusVotes), topic.votingUsers);
}

function isSameSet(arr1, arr2) {
  return  $(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0;
}
