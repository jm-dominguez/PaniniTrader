import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Stadistics } from "../collections/stadistics.js";


if (Meteor.isServer) {
    describe("stadistics", () => {
        describe("methods", () => {
            const stadisticsId = Random.fraction()*100 + 600;
            const quantityP = Random.fraction() * 2; 

            beforeEach(() => {
                PeopleGroups.remove({});
                peopleGroupsId = PeopleGroups.insert({
                    id : stadisticsId,
                    quantity : quantityP,
                    number : stadisticsId
                });
            });
        });
    });
}