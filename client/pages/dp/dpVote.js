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
      var proposal = Proposals.findOne({_id : Session.get('dpVote')});
      var noResUpdate = proposal.noRes;
      // add current user to noRes votes
      noResUpdate.push(Meteor.userId());
      Proposals.update({_id: proposal._id}, { $set: { noRes: noResUpdate } });

      Router.go('dp');
  },
  "click .some": function(event, template){
    var proposal = Proposals.findOne({_id : Session.get('dpVote')});
    var someResUpdate = proposal.someRes;
    // add current user to noRes votes
    someResUpdate.push(Meteor.userId());
    Proposals.update({_id: proposal._id}, { $set: { someRes: someResUpdate } });

      Router.go('dp');
  },
  "click .high": function(event, template){
    var proposal = Proposals.findOne({_id : Session.get('dpVote')});
    var hiResUpdate = proposal.hiRes;
    // add current user to noRes votes
    hiResUpdate.push(Meteor.userId());
    Proposals.update({_id: proposal._id}, { $set: { hiRes: hiResUpdate } });

      Router.go('dp');
  }
});
