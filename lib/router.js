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
      Router.go('topics', {groups: Session.get('activeGroup')});
    }
  });
});

Router.route('login', function(){
  this.render('login');
});
Router.route('register', function(){
  this.render('register');
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
/*Router.route('topics', function(){
  this.render('topics');
});*/
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

//Router.route('/:activeGroup', function() {
//  var activeGroup = 
//  Router.go('/:activeGroup/topics');
//});

//Router.route('topics', function() {
//  var group = Session.get('activeGroup');
//  Router.go(group+'/topics');
//});

Router.route('/:groups/topics', {
    name: 'topics',
    path: '/:groups/topics',
    template: 'topics',
    onBeforeAction: function () {
       Session.set('activeGroup', this.params.groups);
       this.next();
    }
});

/*
Router.route(':group/topics', function() {
  var group = this.params.group;
  this.render('topics', {
    data: function () {
      return Groups.findOne({group: this.params.group})
    }
  });
});
*/
//Router.route('/topics', {
//  name: ':activeGroup',
//  path: '/:activeGroup/topics',
//  template: 'topics'
//});
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