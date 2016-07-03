Template.dpVote.events({
  "click .none": function(event, template){
      Proposals.update({_id: Session.get("dpVote")}, {$set:{resistance: "none"}});
      Router.go('dp');
  },
  "click .some": function(event, template){
    Proposals.update({_id: Session.get("dpVote")}, {$set:{resistance: "some"}});
      Router.go('dp');
  },
  "click .high": function(event, template){
    Proposals.update({_id: Session.get("dpVote")}, {$set:{resistance: "high"}});
      Router.go('dp');
  }
});
