AutoForm.addHooks(['createTopic'],{
    onSuccess: function(formType, result) {
      Session.set('voteTopic', result);
      Router.go('topicVote');
    }
});

// done with matb33/meteor-collection-hooks package
Topics.after.insert(function(userId, doc) {
  // Proposals.insert({topicId: doc._id, proposition: doc.firstProposal})
});

Template.topicCreate.events({
    'click .cancel': function(){
       Router.go('topics');
    }
});
