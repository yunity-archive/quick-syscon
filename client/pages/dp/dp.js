Template.dp.helpers({
  topic: function() {
    return Topics.findOne({_id: Session.get("dp")}).text;
  },
  proposals: function() {
    return Proposals.find({topicId: Session.get("dp")});
  },
  stateColor: function() {
    var vote = this.resistance;
    if (this.resistance) {
      if (vote == "high") return "hi-resistance";
      if (vote == "some") return "some-resistance";
      if (vote == "none") return "no-resistance";
    }
  }
});

Template.dp.events({
  "click .proposal": function(event, template){
      if (!this.resistance) {
        Session.set("dpVote", this._id);
        Router.go('dpVote');
      }
      else {
        alert("already voted");
      }
  },
  "click .create-proposal": function(event, template){
      Router.go('proposalCreate');
  }
});
