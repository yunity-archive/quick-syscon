Template.register.events({
  'submit form': function(e, t) {
     e.preventDefault();
     // Retrieve the input field values
     var email = $('#email').val(),
         password = $('#password').val(),
         passwordAgain = $('#password-again').val();

    // Trim Helper
    var trimInput = function(val) {
       return val.replace(/^\s*|\s*$/g, "");
    }
    var email = trimInput(email);

    // Check password is at least 6 chars long
    var isValidPassword = function(pwd, pwd2) {
        if (pwd === pwd2) {
            return true;
        } else {
            return swal({
                title: "Passwords don’t match",
                text: "Please try again",
                showConfirmButton: true,
                type: "error"
            });
        }
     }

    // If validation passes, supply the appropriate fields to the
    // Accounts.createUser function.
    if (isValidPassword(password, passwordAgain)) { 
       Accounts.createUser({
           email: email,
           password: password
      }, function(error) {
         if (error) {
            sweetAlert("Error: " + error.reason);
            console.log("Error: " + error.reason);
         } else {
            Router.go('/');
         }
      });
    }

    return false;
  }
});

/*
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        }, function(error){
            if(error){
                alert(error.reason);
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("topics"); // Redirect user if registration succeeds
            }
        });
    },
    'click .login-button': function() {
        Router.go('login');
    }
});
*/