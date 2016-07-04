Template.topics.helpers({
  topics: function() {
    var group = Groups.findOne({name: Session.get('activeGroup')});
    if (group)
      return Topics.find({group : group._id, votingDone : false}, {sort: {'dateCreated': -1}});
  },
  sinceCreated: function() {
    return moment(this.dateCreated).fromNow();
  },
  votingStateColor: function() {
    if (this.votingDone)
      return "voting-done";

    var proposal = Proposals.findOne({topicId: this._id});
    if (proposal)
      if (proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()) >= 0)
        return "my-voting-done";

    return "";
  },
  currentVotes: function() {
    var proposal = Proposals.findOne({topicId: this._id});
    var plusVotes;
    var minusVotes;
    if (proposal) {
      if (proposal.plusVotes) plusVotes = proposal.plusVotes.length;
      if (proposal.minusVotes) minusVotes = proposal.minusVotes.length;
    }
    return (plusVotes + minusVotes);
  },
  totalVotes: function() {
    return Topics.findOne({_id: this._id}).votingUsers.length;
  },
  ownTopic: function() {
    return (Topics.findOne({_id: this._id}).owner === Meteor.userId());
  }
});

Template.topics.events({
  'click .create.button': function() {
    Router.go('topicCreate');
  },
  'click .card .edit.item': function(e) {
    Session.set('topicEdit', this._id);
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
    // check whether user has already voted on selected topic -> if not -> vote
    var proposal = Proposals.findOne({topicId: this._id});
    // console.log(Meteor.userId());
    // console.log(proposal.plusVotes.concat(proposal.minusVotes));
    // console.log(proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()));

    if (proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()) == -1) {
      Session.set('topicVote', this._id);
      Router.go('topicVote');
      return false;
    }
    else {
      // show results so far...
      var topic = Topics.findOne({_id: this._id});
      if (topic.votingDone) {
        Session.set('topicQuickResult', this._id);
        Router.go('topicQuickResult');
        return false;
      }
      else {
        alert("You have already voted on this topic! - you will be notified when survey has completed");
        return false;
      }
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
