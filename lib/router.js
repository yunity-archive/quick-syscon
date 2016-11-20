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


Meteor.startup(function() {
  Router.route('/', function() {
    if (!(Meteor.user() || Meteor.loggingIn())) {
      Router.go('/login');
    } else {
      Router.go('/topics');
    }
  });
});

Router.route('login', function(){
  this.render('loginPage');
});
Router.route('register', function(){
  this.render('registerPage');
});

Router.route('profile', function(){
  this.render('profile');
});
Router.route('groups', function(){
  this.render('groups');
});
Router.route('dp', function(){
  this.render('dp');
});
Router.route('dpVote', function(){
  this.render('dpVote');
});
Router.route('proposalCreate', function(){
  this.render('proposalCreate');
});
Router.route('passiveSolutionCreate', function(){
  this.render('passiveSolutionCreate');
});
Router.route('result', function(){
  this.render('result');
});



Router.route('archive', function(){
  this.render('archive');
});
Router.route('topics', function(){
  this.render('topics');
});
Router.route('topicCreate', function(){
  this.render('topicCreate');
});
Router.route('topicEdit', function(){
  this.render('topicEdit');
});
Router.route('topicVote', function(){
  this.render('topicVote');
});
Router.route('topicQuickResult', function(){
  this.render('topicQuickResult');
});
//
//
// Router.route('proposal', {
//   path: '/proposal/:_id',
//   template: 'proposal',
//   controller: BaseController,
//   data: function() {
//     return {
//       doc: Proposals.findOne({_id: this.params._id})
//     };
//   }
// });