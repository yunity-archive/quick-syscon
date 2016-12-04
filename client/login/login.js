Template.login.events({
  'submit form': function(e, t) {
     e.preventDefault();

     // Getting values from fields on page
     var email = $('#login-email').val(),
         password = $('#login-password').val();

     // Calling the loginWithPassword function on the user
     Meteor.loginWithPassword(email, password, function(error) {
         if (error) {
          // Returning a sweetAlert
          return swal({
                title: "Email or password incorrect",
                text: "Please try again",
                timer: 1700,
                showConfirmButton: false,
                type: "error"
            });
         } else {
           Router.go('/');
         }
     });
     return false;
   }
});
/*
Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                Router.go("topics");
            }
        });
    },
    'click .register-button': function() {
        Router.go('register');
    }
});
*/