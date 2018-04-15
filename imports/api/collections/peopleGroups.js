import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import { check } from "meteor/check";

export const PeopleGroups = new Mongo.Collection("peopleGroups");

if(Meteor.isServer){
    Meteor.publish("peopleGroups", function publishGroups(){
        return PeopleGroups.find();
    });
}

Meteor.methods({
    "peopleGroups.addMessage"(id,userP,nameP,detailP,locationP,messagesP){
        check(id, String);
        check(userP, [String]);
        check(nameP, String);
        check(detailP, String);
        check(locationP, String);
        check(messagesP, [String]);

        PeopleGroups.remove(id);

        PeopleGroups.insert({
            _id : id,
            user : userP,
            name : nameP,
            detail : detailP,
            location : locationP,
            messages : messagesP
        });
    },

    "peopleGroups.findById"(id){
        check(id, String);
        return PeopleGroups.findOne({_id: id})
    },

    "peopleGroups.addGroup"(pName,pUser,pDetail,pLocation,pMessages){
        check(pName, String);
        check(pUser, [String]);
        check(pDetail, String);
        check(pLocation, String);
        check(pMessages, [String]);

        PeopleGroups.insert({
            name : pName,
            user: pUser,
            detail : pDetail,
            location : pLocation,
            messages : pMessages
        });
    },

    "peopleGroups.addMember"(id,userP,nameP,detailP,locationP,messagesP){
        check(id, String);
        check(userP, [String]);
        check(nameP, String);
        check(detailP, String);
        check(locationP, String);
        check(messagesP, [String]);

        PeopleGroups.remove(id);

        PeopleGroups.insert({
            _id : id,
            user : userP,
            name : nameP,
            detail : detailP,
            location : locationP,
            messages : messagesP
        });
    }
})