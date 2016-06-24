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
                Router.go("proposals"); // Redirect user if registration succeeds
            }
        });
    },
    'click .login-button': function() {
        Router.go('login');
    }
});
