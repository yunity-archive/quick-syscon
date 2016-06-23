Template.proposals.helpers({
  proposals: () => Proposals.find({}, {sort: {'dateCreated': -1}}),
  votes: function() {
    return Votes.find({proposalId: this._id}).count();
  },
  sinceCreated: function() {
    return moment(this.dateCreated).fromNow();
  },
  duration: function() {
    return Proposals.findOne({_id: this._id}).duration;
  },
  loggedInUser: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.proposals.events({
  'click .create.button': function() {
    // Router.go('proposalCreate');
  },
  'click .card .edit.item': function(e) {
    // Router.go('proposalEdit', {_id: this._id});
    return false;
  },
  'click .card .delete.item': function(e) {
    if (confirm('Are you sure you want to delete this proposal?')) {
      Proposals.remove(this._id);
    }
    return false;
  },
  'click .proposals .ui.card': function(e, template) {
    if ($(e.target).parent('a.item').length === 0 && !$(e.target).is('a.item')) {
      Router.go('proposal', {_id: this._id});
      return false;
    }
  },
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
  }
});
