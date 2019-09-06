const express = require("express");
const app = express();
var bodyParser = require("body-parser");

// Allow CORS so that backend and frontend could be put on different servers
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.json());
app.use(express.urlencoded());

var loaddata = require("./loaddata");
var offline = require("./offline");
var search = require("./search");
var user = require("./user");

app.use("/loaddata", loaddata);
app.use("/offline", offline);
app.use("/search", search);
app.use("/user", user);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
