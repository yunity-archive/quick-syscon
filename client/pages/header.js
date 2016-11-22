Template.header.helpers({
  //buttonLink: function() {
  //  if (Router.current().route.path(this) == "/topics") return "Archive"; else return "Topics";
  //}
});

Template.header.events({
   'click .archive' : function() {
      Router.go('archive', {groups: Session.get('activeGroup')});
   },
   'click .topics' : function() {
      Router.go('topics', {groups: Session.get('activeGroup')});
   },
   'click .profile' : function(){
      Router.go('profile');
   },
   'click .logout' : function() {
      Meteor.logout();
      Router.go('login');
   },
   'click .logo' : function(){
    Router.go('groups');
   },
   'click .groups': function(){
      Router.go('groups');
   },
   //'click .button-link': function(){
   //  if (Router.current().route.path(this) == "/topics")
   //       Router.go('archive');
   //  else Router.go('topics');
   //   return false;
  // }
});
