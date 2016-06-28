Template.topicQuickResult.helpers({
    topic: function(){
      // TODO there is a strange undefined error in console
      var topic = Topics.findOne({_id: Session.get('topicQuickResult')});
      if (topic) return topic.text; else return "Loading ... ";
    },
    proposal: function(){
       var topic = Topics.findOne({_id: Session.get('topicQuickResult')});
       if (topic) return topic.firstProposal; else return "Loading ... ";
    },
    firstProposalAccepted: function(){
      var proposal = Proposals.findOne({topicId: Session.get('topicQuickResult')});
      if (proposal) return (proposal.minusVotes.length == 0); else return "Loading ... ";
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
        Session.set('dp', Session.get('topicQuickResult'));
        Session.set('topicQuickResult', undefined);
        Router.go('dp');
        return false;
    }
});
