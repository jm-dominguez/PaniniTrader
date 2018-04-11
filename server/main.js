import { Meteor } from 'meteor/meteor';
import { Inject } from "meteor/meteorhacks:inject-initial";
import "../imports/api/collections/stickers.js";
import "../imports/api/collections/names.js";
import "../imports/api/collections/groups.js";
import "../imports/api/collections/stadistics.js";
import "../imports/api/collections/peopleGroups.js";


Meteor.startup(() => {
  // code to run on server at startup
  Inject.rawModHtml("addLanguage", function(html) {
    return html.replace(/<html>/, '<!-- HTML 5 -->\n<html lang="en">');
  });

  

  
  
});

Meteor.methods({
  "sendVerification" (){
      let userId = Meteor.userId();
      if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
      }
  },
});
