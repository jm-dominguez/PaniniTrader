import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const PeopleGroups = new Mongo.Collection("peopleGroups");

if(Meteor.isServer){
    Meteor.publish("peopleGroups", function publishGroups(){
        return PeopleGroups.find();
    });
}