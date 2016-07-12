AutoForm.addHooks(['createPassiveSolution'],{
    before: {
        insert: function(doc) {
            console.log("insert ps");
            doc.topicId = Session.get("topicVote");
            doc.noRes = [];
            doc.someRes = [];
            doc.hiRes = [];
            doc.plusVotes = [];
            doc.minusVotes = [];
            return doc;
        }
    },
    onSuccess: function(formType, result) {
        console.log("onSuccess");
        Session.set('dp', Session.get('topicVote'));
        Session.set('topicVote', undefined);
        Router.go('dp');
    }
});

Template.passiveSolutionCreate.events({
  "click .cancel": function(event, template){
      Router.go('topics');
  }
});
