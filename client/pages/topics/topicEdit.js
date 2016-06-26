AutoForm.addHooks(['editTopic'],{
    onSuccess: function(formType, result) {
        Proposals.update({topicId: doc._id, proposition: doc.firstProposal});
        Router.go('topics');
    }
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
