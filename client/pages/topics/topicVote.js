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
        Router.go('topicQuickResult');
      }
      else
        Router.go('topics');
    },
    'click .no': function(){
      var proposal = Proposals.findOne({topicId: Session.get('topicVote')});
      var minusVotesUpdate = proposal.minusVotes;
      // add current user to minus votes
      minusVotesUpdate.push(Meteor.userId());
      Proposals.update({_id: proposal._id}, { $set: { minusVotes: minusVotesUpdate } });

      if (votingComplete()) {
        Router.go('topicQuickResult');
      }
      else
        Router.go('topics');
      }
});

function votingComplete() {
  var topic = Topics.findOne({_id: Session.get('topicVote')});
  var proposal = Proposals.findOne({topicId: Session.get('topicVote')});
  return (proposal.minusVotes.concat(proposal.plusVotes).equals(topic.votingUsers));
}

Array.prototype.equals = function( array ) {
  return this.length == array.length &&
        this.every( function(this_i,i) { return this_i == array[i] } )
}
