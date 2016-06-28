Template.dp.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  proposals: function() {
    return Proposals.find({topicId: Session.get("dp")});
  }
});

Template.dp.events({
  "click #foo": function(event, template){

  }
});
