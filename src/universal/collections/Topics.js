import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Topics = new Mongo.Collection('topics');

export default Topics;
