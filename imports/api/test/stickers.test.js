import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Stickers } from "../collections/stickers.js";


if (Meteor.isServer) {
    describe("stickers", () => {
        describe("methods", () => {
            const stickerId = Random.id();
            const numberP = Random.fraction()*528;
            const name = Random.secret();

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