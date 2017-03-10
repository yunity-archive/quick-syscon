import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Accounts } from 'meteor/accounts-base'

// Server methods
Meteor.methods({
    // updatePW: function(userId, newPassword){
    //     Accounts.setPassword(userId, newPassword)
    // },
    insertUser: function(user, userPw){
      Meteor.users.insert(user, function(err,result){
        if (err) {
          console.log("methods.js - insert user error");
        }
        else {
          Accounts.setPassword(result, userPw)
          console.log("methods.js - insert user succ");
        }
      })
    },
    updateUser: function(user, userId, userPw){
      Meteor.users.update(userId, {$set: user}, function(err,result){
        if (err) {
          console.log("methods.js - update user error");
        }
        else {
          console.log("methods.js - update user succ");
        }
      })

      if (userPw) {
        Accounts.setPassword(userId, userPw)
      }
      else {
      }
    }
})
