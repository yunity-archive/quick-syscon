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
      var proposal = Proposals.findOne({topicId: Session.get('topicQuickResult'), title: "1st proposal"});
      if (proposal) return (proposal.minusVotes.length == 0); else return "Loading ... ";
    }
});

Template.topicQuickResult.events({
    'click .done': function(){
        Topics.update(Session.get('topicQuickResult'), { $set: { votingState: "voting-done" } });
        Session.set('topicQuickResult', undefined);
        Router.go('topics');
        return false;
    },
    'click .deeper': function(){
        Topics.update(Session.get('topicQuickResult'), { $set: { votingState: "dp" } });
        Session.set('dp', Session.get('topicQuickResult'));
        Session.set('topicQuickResult', undefined);
        Router.go('dp');
        return false;
    }
});
