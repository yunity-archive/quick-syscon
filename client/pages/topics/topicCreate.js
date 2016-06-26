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

            // insert owner
            doc.owner = Meteor.userId();

            return doc;
        }
    },
    onSuccess: function(formType, result) {
      Session.set('topicVote', result);
      Router.go('topicVote');
    }
});

// done with matb33/meteor-collection-hooks package
Topics.after.insert(function(userId, doc) {
  Proposals.insert({topicId: doc._id, proposition: doc.firstProposal, plusVotes: [], minusVotes: []})
});

Template.topicCreate.events({
    'click .cancel': function(){
       Session.set('topicVote', undefined);
       Router.go('topics');
    }
});
