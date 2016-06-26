Template.topicQuickResult.helpers({
    topic: function(){
       return Topics.findOne({_id: Session.get('topicVote')}).text;
    },
    proposal: function(){
       return Topics.findOne({_id: Session.get('topicVote')}).firstProposal;
    },
    firstProposalAccepted: function(){
      var proposal = Proposals.findOne({topicId: Session.get('topicVote')});
      return (proposal.minusVotes.length == 0);
    }
});

Template.topicQuickResult.events({
    'click .done': function(){
        Topics.update(Session.get('topicVote'), { $set: { votingDone: true } });
        Router.go('topics');
        return false;
    },
    'click .deeper': function(){
        Topics.update(Session.get('topicVote'), { $set: { votingDone: true } });
        Router.go('topics'); // TODO later we redirect to deeper processing here
        return false;
    }
});
