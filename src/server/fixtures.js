import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {Accounts} from 'meteor/accounts-base'

if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'admin',
        email: 'email',
        password: '1234',
        profile: {
            first_name: 'fname',
            last_name: 'lname',
            company: 'company',
        }
    })
}
