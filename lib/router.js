Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  }
});

// main route
Router.route('/', function() {
  if (!Meteor.userId())
    this.render('register'); // do login here
  else
    this.render('topics');
});

// user related
Router.route('/login', function() {
  this.render('login');
});

Router.route('/register', function() {
  this.render('register');
});

Router.route('/profile', function() {
  this.render('profile');
});

// content related
Router.route('/topics', function() {
  this.render('topics');
});

Router.route('/proposals', function() {
  this.render('proposals');
});

Router.route('proposal', {
  path: '/proposal/:_id',
  template: 'proposal',
  // controller: BaseController,
  data: function() {
    return {
      doc: Proposals.findOne({_id: this.params._id})
    };
  }
});
