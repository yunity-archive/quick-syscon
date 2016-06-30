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
  }
});

Template.dp.events({
  "click .proposal": function(event, template){
      Router.go('dpVote');
  },
  "click .add-proposal": function(event, template){
      Router.go('addProposal');
  }
});
