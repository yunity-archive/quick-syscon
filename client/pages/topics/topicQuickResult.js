Template.topicQuickResult.helpers({
    topic: function(){
       return Topics.findOne({_id: Session.get('topicQuickResult')}).text;
    },
    proposal: function(){
       return Topics.findOne({_id: Session.get('topicQuickResult')}).firstProposal;
    }
});
