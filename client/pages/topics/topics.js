Template.topics.helpers({
  topics: function() {
    var group = Groups.findOne({name: Session.get('activeGroup')});
    if (group)
      return Topics.find({group : group._id}, {sort: {'dateCreated': -1}});
  },
  sinceCreated: function() {
    return moment(this.dateCreated).fromNow();
  },
  votingStateColor: function() {
    if (Proposals.find({topicId: this._id}).count() > 1) {
      return "voting-in-dp";
    }
    else {
      var proposal = Proposals.findOne({topicId: this._id, title: "1st proposal"});
      if (proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()) >= 0) {
        if (this.votingDone) return "voting-done";
        else return "my-voting-done";
      }
      else {
        return "not-voted-yet";
      }
    }
    return "";
  },
  currentVotes: function() {
    var proposal = Proposals.findOne({topicId: this._id, title: "1st proposal"});
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
  'click .card .help.item': function(e) {
    alert("you do not own this topic");
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
    var proposal = Proposals.findOne({topicId: this._id, title: "1st proposal"});
    if (proposal.plusVotes) {
      if (proposal.plusVotes.concat(proposal.minusVotes).indexOf(Meteor.userId()) == -1) {
        Session.set('topicVote', this._id);
        Router.go('topicVote');
        return false;
      }
    }

    if (proposal.minusVotes) {
      if (proposal.minusVotes.concat(proposal.plusVotes).indexOf(Meteor.userId()) == -1) {
        Session.set('topicVote', this._id);
        Router.go('topicVote');
        return false;
      }
    }

      // show results so far...
      var topic = Topics.findOne({_id: this._id});
      if (topic.dp) {
        Session.set('dp', this._id);
        Router.go('dp');
        return false;
      }
      if (topic.votingDone) {
        Session.set('topicQuickResult', this._id);
        Router.go('topicQuickResult');
        return false;
      }
      else {
        alert("You have already voted on this topic! - you will be notified when survey has completed");
        return false;
      }
  },
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
  }
});
