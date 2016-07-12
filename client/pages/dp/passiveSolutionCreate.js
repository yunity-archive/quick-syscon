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
      Router.go('topics');
    }
});

Template.passiveSolutionCreate.events({
  "click .cancel": function(event, template){
      Router.go('topics');
  }
});
