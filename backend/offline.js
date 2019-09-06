const express = require("express");
const router = express.Router();
const db = require("./firebase");
const admin = require('firebase-admin');
/**Read data from firebase, which could work offline */
router.get("/", function(req, res) {
  var userReference = db.ref("/article/headlines/articles");
  userReference.on(
    "value",
    function(snapshot) {
      res.json(snapshot.val());
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

router.get("/category/:category", function(req, res) {
  var category = req.params.category;
  var userReference = db.ref("/article/categories/" + category + "/articles");
  userReference.on(
    "value",
    function(snapshot) {
      res.json(snapshot.val());
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

router.get("/:newsId", function(req, res) {
  var newsId = req.params.newsId;
  var userReference = db.ref("/article/alldata/" + newsId);
  userReference.on(
    "value",
    function(snapshot) {
      res.json(snapshot.val());
      if (req.query.uid) {
          var uid=req.query.uid;
          var img_url=snapshot.val().img
          var summary=snapshot.val().title
          var news_id=newsId
          var timestamp=new Date().getTime();
          var UserReference = db.ref("/user");
          UserReference.orderByChild("uid").equalTo(uid).on(
              "child_added",
              function(snapshot) {
                  var key_id=snapshot.key;
                  if(!snapshot.hasChild("recentread")){
                      recentread={"img_url":img_url,"summary":summary,"timestamp":timestamp};
                      db.ref("/user/"+key_id).child(recentread).child(news_id).setValue(recentread)
                  }
                  else{
                      var flag=0;
                      var count=0;
                      var recentread=snapshot.child("/recentread").val();
                      for(let i in recentread){
                          count=count+1;
                      }
                      var least_timestamp=new Date().getTime();
                      var not_recent_id=0
                      for(let i in recentread){
                          if(i===news_id){
                              recentread[i].timestamp=timestamp;
                              flag=2;
                              break;
                          }
                          if(recentread[i].timestamp<least_timestamp){
                              not_recent_id=i;
                              least_timestamp=recentread[i].timestamp;
                          }
                      }
                      if(count===7&&flag!==2){
                          delete(recentread[not_recent_id])
                          recentread[news_id]=({"img_url":img_url,"summary":summary,"timestamp":timestamp});
                          flag=1;
                      }
                      if(flag===0){
                          recentread[news_id]=({"img_url":img_url,"summary":summary,"timestamp":timestamp});
                      }
                      db.ref("/user/"+key_id).update({
                          recentread: recentread,
                      })
                  }
                  UserReference.off("child_added");
              },
              function(errorObject) {
                  console.log("The read failed: " + errorObject.code);
              }
          );
      }
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

router.get("/source/:source", function(req, res) {
  var source = req.params.source;
  var userReference = db
    .ref("/article/alldata")
    .orderByChild("source")
    .equalTo(source);
  userReference.on(
    "value",
    function(snapshot) {
      var sourceList = [];
      for (var each in snapshot.val()) {
        sourceList.push(snapshot.val()[each]);
      }
      res.send(sourceList);
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

router.get("/search/:keyWord", function(req, res) {
  var keyWord = req.params.keyWord;
  var userReference = db
    .ref("/article/alldata")
    .orderByChild("title")
    .startAt(keyWord)
    .endAt(keyWord + "\uf8ff");
  userReference.on(
    "value",
    function(snapshot) {
      var searchList = [];
      for (var each in snapshot.val()) {
        searchList.push(snapshot.val()[each]);
      }
      res.send(searchList);
      userReference.off("value");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

module.exports = router;
