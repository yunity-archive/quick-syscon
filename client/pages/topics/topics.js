Template.topics.helpers({
  topics: () => Topics.find({}, {sort: {'dateCreated': -1}}),
  // votes: function() {
  //   return Votes.find({proposalId: this._id}).count();
  // },
  sinceCreated: function() {
    return moment(this.dateCreated).fromNow();
  }
});

Template.topics.events({
  'click .create.button': function() {
    Router.go('topicCreate');
  },
  'click .card .edit.item': function(e) {
    Session.set('editTopic', this._id);
    Router.go('topicEdit');
    return false;
  },
  'click .card .delete.item': function(e) {
    if (confirm('Are you sure you want to delete this topic?')) {
      Topics.remove(this._id);
    }
    return false;
  },
  'click .topics .ui.card': function(e, template) {
    // open decision view
    // TODO rm.. just for testing
    // Meteor.call('notify', 'serverMessage:' , "ABC", "T", {
    //         userCloseable: true,
    //         timeout: 10
    // });

    // check whether user has already voted on selected topic -> if not -> vote
    var proposal = Proposals.findOne({topicId: this._id});
        console.log(this._id);

    console.log(Meteor.userId());
    console.log(proposal.plusVotes.concat(proposal.minusVotes));
    console.log(proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()));
    
    if (proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()) == -1) {
      Session.set('topicVote', this._id);
      Router.go('topicVote');
      return false;
    }

    // if ($(e.target).parent('a.item').length === 0 && !$(e.target).is('a.item')) {
    //   Router.go('topics', {_id: this._id});
    //   return false;
    // }
  },
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
  }
});
