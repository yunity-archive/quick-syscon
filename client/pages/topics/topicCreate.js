AutoForm.addHooks(['createTopic'],{
    before: {
        insert: function(doc) {
            // register all users on topic TODO later only group
            var allUsers = [];
            var users = Meteor.users.find();
            users.forEach(function(u){
              allUsers.push(u._id);
            });
            doc.votingUsers = allUsers;
            return doc;
        }
    },
    onSuccess: function(formType, result) {
      Session.set('voteTopic', result);
      Router.go('topicVote');
    }
});

// done with matb33/meteor-collection-hooks package
Topics.after.insert(function(userId, doc) {
  Proposals.insert({topicId: doc._id, proposition: doc.firstProposal, plusVotes: [], minusVotes: []})
});

Template.topicCreate.events({
    'click .cancel': function(){
       Router.go('topics');
    }
});
