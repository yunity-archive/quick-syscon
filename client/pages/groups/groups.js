Template.groups.helpers({
    groups: function(){
       return Groups.find();
    },
    stateColor: function() {
      if (this.name == Session.get('activeGroup'))
        return "active-group";
    }
});

Template.groups.events({
  "click .content": function(event, template){
     Session.set('activeGroup', this.name);
     Router.go('topics', { groups: this.name });
  }
});
