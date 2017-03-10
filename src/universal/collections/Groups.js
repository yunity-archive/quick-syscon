import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Groups = new Mongo.Collection('groups');

export default Groups;
