Template.topics.helpers({
  topics: () => Topics.find({}, {sort: {'dateCreated': -1}})
});

Template.topics.events({
  'click .create.button': function() {
    Router.go('topicCreate');
  },
  'click .card .edit.item': function(e) {
    Router.go('topicEdit', {_id: this._id});
    return false;
  },
  'click .card .delete.item': function(e) {
    if (confirm('Are you sure you want to delete this topic?')) {
      Topics.remove(this._id);
    }
    return false;
  },
  'click .topics .ui.card': function(e, template) {
    if ($(e.target).parent('a.item').length === 0 && !$(e.target).is('a.item')) {
      Router.go('topics', {_id: this._id});
      return false;
    }
  },
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
  }
});
