Template.topicVote.helpers({
    topic: function(){
       return Topics.findOne({_id: Session.get('voteTopic')}).text;
    },
    proposal: function(){
       return Topics.findOne({_id: Session.get('voteTopic')}).firstProposal;
    }
});

Template.topicVote.events({
    'click .ok': function(){
      // check how many group (or users here with one group) members we have....
      // this is dynamic as users might join later - then they become topic listener
      var proposal = Proposals.findOne({topicId: Session.get('voteTopic')});
      Proposals.update({_id: proposal._id}, { $inc: { plusVotes: 1 } });
    },
    'click .no': function(){
      var proposal = Proposals.findOne({topicId: Session.get('voteTopic')});
      Proposals.update({_id: proposal._id}, { $inc: { minusVotes: 1 } });
    }
});
