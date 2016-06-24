Template.topicVote.helpers({
    topic: function(){
       return Topics.findOne({_id: Session.get('voteTopic')}).text;
    },
    proposal: function(){
       return Topics.findOne({_id: Session.get('voteTopic')}).firstProposal;
    }
});
