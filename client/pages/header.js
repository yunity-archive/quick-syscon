Template.header.helpers({
  buttonLink: function() {
    if (Router.current().route.path(this) == "/topics") return "Archive"; else return "Topics";
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
     if (Router.current().route.path(this) == "/topics")
          Router.go('archive');
     else Router.go('topics');
      return false;
   }
});
