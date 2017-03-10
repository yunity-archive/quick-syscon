import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const HelpMe = new Mongo.Collection('helpMe');

export default HelpMe;
