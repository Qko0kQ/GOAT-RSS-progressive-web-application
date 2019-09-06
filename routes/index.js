var express = require("express");
var router = express.Router();
let path = require("path");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
