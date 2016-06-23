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

const BaseController = RouteController.extend({
  waitOn: function() {
    const subscriptions = [];
    _.each(CollectionUtils.getAll(), function(collection) {
      if (!Collections.isTemporary(collection)) {
        subscriptions.push(Meteor.subscribe(Collections.getName(collection)));
      }
    });
    return subscriptions;
  }
});

Routes.config({
  BaseController: BaseController
});

Meteor.startup(function() {
  Router.route('/', function() {
    Router.go('/proposals');
  });
});

Meteor.startup(function() {
  Routes.crudRoute(Proposals, {
  });
});

Router.route('proposal', {
  path: '/proposal/:_id',
  template: 'proposal',
  controller: BaseController,
  data: function() {
    return {
      doc: Proposals.findOne({_id: this.params._id})
    };
  }
});
