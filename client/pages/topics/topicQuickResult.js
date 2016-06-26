Template.topicQuickResult.helpers({
    topic: function(){
       return Topics.findOne({_id: Session.get('topicVote')}).text;
    },
    proposal: function(){
       return Topics.findOne({_id: Session.get('topicVote')}).firstProposal;
    }
});

Template.topicQuickResult.events({
    'click .done': function(){
        Topics.update(Session.get('topicVote'), { $set: { votingDone: true } });
        Router.go('topics');
        return false;
    }
});
