
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
  participantsMax: function() {
    // all members of the group - not equal to participants when voting ended due to time limit
    return Meteor.users.find().count();
  },
  totalResistance: function() {
    // some = 1point, hi = 2points
    return (2 * this.hiRes.length + this.someRes.length);
  },
  totalResistanceMax: function() {
    // some = 1point, hi = 2points
    return (2 * this.someRes.concat(this.hiRes.concat(this.noRes)).length);
  },
  avgResistance: function() {
    return 100 * ((2 * this.hiRes.length + this.someRes.length) / (2 * this.someRes.concat(this.hiRes.concat(this.noRes)).length));
  },
  avgAcceptance: function() {
    return 100 - (100 * ((2 * this.hiRes.length + this.someRes.length) / (2 * this.someRes.concat(this.hiRes.concat(this.noRes)).length)));
  }
});

Template.result.events({
  "click #foo": function(event, template){

  }
});
