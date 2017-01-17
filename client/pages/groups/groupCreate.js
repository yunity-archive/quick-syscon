AutoForm.addHooks(['createGroup'],{
    before: {
        insert: function(doc) {
            // insert owner (= user id ) and group id
            doc.owner = Meteor.userId();
    
            return doc;
        }
    },
    onSuccess: function(formType, result) {
      Router.go('groups');
    }
});

// done with matb33/meteor-collection-hooks package
Groups.after.insert(function(userId, doc) {
  if (!Groups.findOne({name: doc.name})) {
    Groups.insert(group);
  }
});

Template.groupCreate.events({
    'click .cancel': function(){
       Router.go('groups');
    }
});
