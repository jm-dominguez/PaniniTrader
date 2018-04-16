import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { PeopleGroups } from "../collections/peopleGroups.js";

if (Meteor.isServer) {
    describe("peopleGroups", () => {
        describe("methods", () => {
            const userId = Random.id();
            let users = [];
            let messagesP = [];
            users.push(userId);
            messagesP.push("People groups test");

            beforeEach(() => {
                PeopleGroups.remove({});
                peopleGroupsId = PeopleGroups.insert({
                    name : "People groups test",
                    user : users,
                    detail : "People groups test",
                    location : "People groups test",
                    messages : messagesP
                });
            });
        });
    });
}