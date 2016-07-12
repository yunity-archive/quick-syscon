
Template.result.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  proposals: function() {
    return Proposals.find({topicId : Session.get('dp')});
  },
  participants: function() {
    var p = Proposals.findOne({topicId : Session.get('dp')});
    return p.someRes.concat(p.hiRes.concat(p.noRes)).length;
  },
  totalResistance: function() {

  },
  avgResistance: function() {

  },
  avgAcceptance: function() {

  }
});

Template.result.events({
  "click #foo": function(event, template){

  }
});
