
Template.result.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  topic: function() {
    return Topics.findOne({_id : Session.get('dp')}).text;
  },
  proposals: function() {
    return Proposals.find({topicId : Session.get('dp')});
  },
  participants: function() {
    // here this is allowed to return any proposal that fits, cause all must have same length
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
