AutoForm.addHooks(['editTopic'],{
    onSuccess: function(formType, result) {
        Router.go('topics');
    }
});

// done with matb33/meteor-collection-hooks package
Topics.after.update(function(userId, doc, fieldNames, modifier, options) {
  // do add first proposal to proposals
  Proposals.update({topicId: doc._id, proposition: doc.firstProposal});
});

Template.topicEdit.helpers({
    item: function(){
       return Topics.findOne({_id: Session.get('editTopic')});
    }
});

Template.topicEdit.events({
    'click .cancel': function(){
       Router.go('topics');
    }
});
