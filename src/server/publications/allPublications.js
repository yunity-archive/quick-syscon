import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Accounts } from 'meteor/accounts-base'

import HelpMe from  '../../universal/collections/HelpMe'
import Groups from  '../../universal/collections/Groups'
import Topics from  '../../universal/collections/Topics'

Meteor.publish('helpMe', function(name) {
    return HelpMe.find({name: name})
})
Meteor.publish('groups', function() {
    return Groups.find()
})
Meteor.publish('topics', function() {
    return Topics.find()
})


HelpMe.allow({ 
    insert: function() {  
        return true 
    },
    update: function() {  
        return true 
    },
    remove: function() {  
        return true 
    }
})
Groups.allow({ 
    insert: function() {  
        return true 
    },
    update: function() {  
        return true 
    },
    remove: function() {  
        return true 
    }
})
Topics.allow({ 
    insert: function() {  
        return true 
    },
    update: function() {  
        return true 
    },
    remove: function() {  
        return true 
    }
})
