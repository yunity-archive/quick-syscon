Template.dpVote.helpers({
  title: function() {
    return Proposals.findOne({_id: Session.get("dpVote")}).title;
  },
  proposition: function() {
    return Proposals.findOne({_id: Session.get("dpVote")}).proposition;
  }
});


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
