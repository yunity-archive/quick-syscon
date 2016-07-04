Template.header.helpers({
  buttonLink: function() {
    if (Router.current().route.path(this) == "/archive") return "Topics"; else return "Archive";
  }
});

Template.header.events({
   'click .user':function(){
      Router.go('profile');
   },
   'click .active-group': function(){
      Router.go('groups');
      return false;
   },
   'click .button-link': function(){
     if (Router.current().route.path(this) == "/archive")
          Router.go('topics');
     else Router.go('archive');
      return false;
   }
});
