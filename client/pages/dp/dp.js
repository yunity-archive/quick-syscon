Template.dp.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  proposals: function() {
    return Proposals.find({topicId: Session.get("dp")});
  },
  passiveSolution: function() {
    return Topics.findOne({_id: Session.get("dp")}).passiveSolution;
  },
  deeperProcess: function() {
    return Topics.findOne({_id: Session.get("dp")}).deeperProcess;
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
