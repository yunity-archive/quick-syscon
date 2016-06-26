AutoForm.addHooks(['topicEdit'],{
    onSuccess: function(formType, result) {
        Proposals.update({topicId: doc._id, proposition: doc.firstProposal});
        Router.go('topics');
    }
});

Template.topicEdit.helpers({
    item: function(){
       return Topics.findOne({_id: Session.get('topicEdit')});
    }
});

Template.topicEdit.events({
    'click .cancel': function(){
       Session.set('topicEdit', undefined);
       Router.go('topics');
    }
});
