Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.body.helpers({
      tasks(){
        "use strict";
        if(Session.get("hideCompleted")){
            return Tasks.find(
                {checked: {$ne: true}},
                {sort: {createdAd: -1}}
            );
        }else{
            return Tasks.find(
                {},
                {sort: {createdAd: -1}}
            );
        }
    },
      hideCompleted(){
          "use strict";
          return Session.get("hideCompleted")
      },
      incompleteCount(){
          "use strict";
          return Tasks.find({checked: {$ne: true}}).count();
      }
  });

  Template.body.events({
      "submit .new-task": function(event){
          "use strict";
          event.preventDefault();
          var text = event.target.task_name.value.trim();
          if(text){
              Tasks.insert({
                  text: text,
                  createdAd: new Date()
              });
              event.target.task_name.value = "";
          }else{
              console.log(event.target);
          }
      },
      "click .toggle-checked": function(event){
          "use strict";
          Tasks.update(this._id, {
              $set: {
                  checked: !this.checked
              }
          });
      },
      "click .delete": function(event){
          "use strict";
          Tasks.remove(this._id);
      },
      "change .hide-completed input": function(event){
          "use strict";
          Session.set("hideCompleted", event.target.checked);
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
