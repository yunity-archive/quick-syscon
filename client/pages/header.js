Template.header.events({
   'click .user':function(){
      Router.go('profile');
   },
   'click .card': function(){
      Router.go('groups');
      return false;
   }
});
