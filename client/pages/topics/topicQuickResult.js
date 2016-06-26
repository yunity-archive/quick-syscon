Template.topicQuickResult.helpers({
    topic: function(){
       return Topics.findOne({_id: Session.get('topicQuickResult')}).text;
    },
    proposal: function(){
       return Topics.findOne({_id: Session.get('topicQuickResult')}).firstProposal;
    },
    firstProposalAccepted: function(){
      var proposal = Proposals.findOne({topicId: Session.get('topicQuickResult')});
      return (proposal.minusVotes.length == 0);
    }
});

Template.topicQuickResult.events({
    'click .done': function(){
        Topics.update(Session.get('topicQuickResult'), { $set: { votingDone: true } });
        Session.set('topicQuickResult', undefined);
        Router.go('topics');
        return false;
    },
    'click .deeper': function(){
        Topics.update(Session.get('topicQuickResult'), { $set: { votingDone: true } });
        Session.set('topicQuickResult', undefined);
        Router.go('topics'); // TODO later we redirect to deeper processing here
        return false;
    }
});
