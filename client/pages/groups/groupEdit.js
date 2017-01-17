AutoForm.addHooks(['groupEdit'],{
  onSuccess: function(formType, result) {
      Router.go('groups');

  },
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
      Proposals.update({groupId: currentDoc._id, proposition: currentDoc.firstProposal});
  }
});

Template.groupEdit.helpers({
    item: function(){
       return Groups.findOne({_id: Session.get('groupEdit')});
    }
});

Template.groupEdit.events({
    'click .cancel': function(){
       Session.set('groupEdit', undefined);
       Router.go('groups');
    }
});
