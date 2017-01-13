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

            // insert owner (= user id ) and group id
            doc.owner = Meteor.userId();
            doc.group = Groups.findOne({name: Session.get('activeGroup')})._id;
            doc.dateCreated = new Date();
            doc.votingState = "voting";
            doc.dp = false;

            return doc;
        }
    },
    onSuccess: function(formType, result) {
      // TODO SLACK_TOPIC_CREATE();
      // Meteor.call('notify', "New topic created", result, {
      //         userCloseable: true,
      //         timeout: 10
      // });
      Session.set('topicVote', result);
      Router.go('topicVote');
    }
});

// done with matb33/meteor-collection-hooks package
Topics.after.insert(function(userId, doc) {
  Proposals.insert({topicId: doc._id, title: "1st proposal", proposition: doc.firstProposal, noRes: [], someRes: [], hiRes: [], plusVotes: [], minusVotes: []});
});

Template.topicCreate.events({
    'click .cancel': function(){
       Session.set('topicVote', undefined);
       Router.go('topics', {groups: Session.get('activeGroup')});
    }
});
