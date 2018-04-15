import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";
export const Stickers = new Mongo.Collection("stickers");

if(Meteor.isServer){
    Meteor.publish("stickers", function stickerPublication(){
        return Stickers.find();
    });
    Meteor.publish("Mystickers", function stickerPublication(){
        return Stickers.find({owner:this.userId});
    });
    Meteor.publish("Otherstickers", function stickerPublication(){
        return Stickers.find({owner:{$ne:this.userId}});
    });
    
}

Meteor.methods({
    "stickers.remove"(id){
        check(id, String);

        Stickers.remove(id);
    },

    "stickers.insert"(pnumber, pphone, pname, pcountry){
        
        check(pnumber, String);
        check(pphone, String);
        check(pname,String);
        check(pcountry, String);


        Stickers.insert({
            number: pnumber,
            owner: this.userId,
            phone: pphone,
            name: pname,
            country: pcountry,
            DateAdded: new Date(),
        });
    }
});