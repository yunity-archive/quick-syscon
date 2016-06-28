AutoForm.addHooks(['topicEdit'],{
  onSuccess: function(formType, result) {
      Router.go('topics');
  },
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
      Proposals.update({topicId: currentDoc._id, proposition: currentDoc.firstProposal});
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
