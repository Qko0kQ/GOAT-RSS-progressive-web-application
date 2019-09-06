const express = require("express");
const router = express.Router();
const db = require("./firebase");
var admin = require('firebase-admin');

router.post("/register", function(req, res) {
  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
  }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        let user = {
            uid: userRecord.uid,
            email: req.body.email,
            channel: null,
            recentread:{a:0},
        };
        let userRef = db.ref('user/');
        userRef.push().set(user);
        console.log("Successfully created new user:", userRecord.uid);
        return res.json(userRecord);
    })
        .catch(function (error) {
          console.log("Error creating new user:", error);
          return res.send(error);
        });
})
router.get("/:id", function(req, res) {
    var uid=req.params.id;
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "child_added",
        function(snapshot) {
            var key_id=snapshot.key
            var Email_val=null
            var Channel_val=null
            var recentread=snapshot.val().recentread;
            if (recentread) delete (recentread["a"]);
            var Email=db.ref("/user/"+key_id).child("email")
            Email.on('value', snapshot => {
                Email_val=snapshot
            })
            var Channel=db.ref("/user/"+key_id).child("channel")
            Channel.on('value', snapshot => {
                Channel_val=snapshot
            })
            userReference.off("value");
            return res.json({"email":Email_val,"channel":Channel_val,recentread:recentread});
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        }
    )

});

router.put("/:id", function(req, res) {
    var name=JSON.stringify(req.body.name).replace(/\"/g, "");
    var type=JSON.stringify(req.body.type).replace(/\"/g, "");
    var uid=req.params.id;
    var userReference = db.ref("/user");
    userReference.orderByChild("uid").equalTo(uid).on(
        "child_added",
        function(snapshot) {
            var key_id=snapshot.key;
            var currentdata=snapshot.val().channel;
            if (!snapshot.hasChild("channel")) {
                currentdata = {};
                currentdata[name]= {"type": type};
            } else {
                var flag = 0;
                for (const i in currentdata) {
                    if (i === name && currentdata[i].type === type) {
                        delete (currentdata[i]);
                        flag = 1;
                        break;
                    }
            }
            if (flag === 0) {
                currentdata[name] = {"type": type};
            }
        }
        db.ref("/user/"+key_id).update({
            channel: currentdata,
        })
        res.send("Update Done");
        userReference.off("child_added");
    },
    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send("The read failed: " + errorObject.code);
    }
);
});
module.exports = router;