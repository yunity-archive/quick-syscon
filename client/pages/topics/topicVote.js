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
      // TRICK: here we query creation date to find the initial 1st proposal created for this topic
      var proposal = Proposals.find({topicId: Session.get('topicVote')}, {sort: {dateCreated: 1}}).fetch()[0];
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
      var proposal = Proposals.find({topicId: Session.get('topicVote')}, {sort: {dateCreated: 1}}).fetch()[0];
      var minusVotesUpdate = proposal.minusVotes;
      // add current user to minus votes
      minusVotesUpdate.push(Meteor.userId());
      Proposals.update({_id: proposal._id}, { $set: { minusVotes: minusVotesUpdate } });

      console.log(proposal.minusVotes);
      console.log(proposal.minusVotes.length);


      // 1st neg vote -> add passive solution to dp
      if (proposal.minusVotes.length <= 1) {
          // START DEEPER PROCESSING
          console.log("mm");
          Topics.update({_id: Session.get('topicVote')}, { $set: { dp: true } });
          Router.go("passiveSolutionCreate");
          return false;
          // Proposals.insert({topicId: Session.get('topicVote'), title: "Passive solution", proposition: "a computer generated prop", noRes: [], someRes: [], hiRes: [], plusVotes: [], minusVotes: []});
      }

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
  var proposal = Proposals.findOne({topicId: Session.get('topicVote'), title: "1st proposal"});

  return isSameSet(proposal.minusVotes.concat(proposal.plusVotes), topic.votingUsers);
}

function isSameSet(arr1, arr2) {
  return  $(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0;
}
