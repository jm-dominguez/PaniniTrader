import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import { check } from "meteor/check";

export const PeopleGroups = new Mongo.Collection("peopleGroups");

if(Meteor.isServer){
    Meteor.publish("peopleGroups", function publishGroups(){
        return PeopleGroups.find({ user: this.userId });
    });
    Meteor.publish("notMyPeopleGroups", function publishGroups(){
        return PeopleGroups.find({ user: { $ne: this.userId } });
    });
}

Meteor.methods({
    "peopleGroups.addMessage"(id,userP,nameP,detailP,locationP, newMsg, messagesP){
        check(id, String);
        check(userP, [String]);
        check(nameP, String);
        check(detailP, String);
        check(locationP, String);
        check(newMsg, String);
        check(messagesP, [String]);


        messagesP.push( newMsg + "|"+ Meteor.userId() + "|"+ Meteor.user().profile.firstName + "|" + Meteor.user().profile.surname);

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

        pUser.push(Meteor.userId());

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

        userP.push(Meteor.userId());

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