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

Router.route('/', function() {
  if (!Meteor.userId())
    this.render('proposals'); // do login here
  else
    this.render('proposals');
});

Router.route('/login', function() {
  this.render('login');
});

Router.route('/profile', function() {
  this.render('profile');
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
