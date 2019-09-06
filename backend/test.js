// const admin = require("firebase-admin");
// const serviceAccount = require("./ServiceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://rss-pwa-ba0d0.firebaseio.com/"
// });

// const db = admin.database();

// var AylienNewsApi = require("aylien-news-api");

// var apiInstance = new AylienNewsApi.DefaultApi();
// var app_id = apiInstance.apiClient.authentications["app_id"];
// app_id.apiKey = "d12ed1c6";
// var app_key = apiInstance.apiClient.authentications["app_key"];
// app_key.apiKey = "ce32b4c15a74665e21f9312894f04158";

// var opts = {
//   sortBy: "hotness",
//   language: ["en"],
//   publishedAtStart: "NOW-1DAYS",
//   publishedAtEnd: "NOW",
//   perPage: 10
// };

// var resultList = [];
// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("API called successfully. Returned data: ");
//     console.log("========================================");
//     for (var i = 0; i < data.stories.length; i++) {
//       //   console.log(data.stories[i].title + " / " + data.stories[i].source.name);
//       var story = {
//         title: "",
//         author: "",
//         time: "",
//         img: "",
//         source: "",
//         summary: "",
//         hashtags: [],
//         body: ""
//       };
//       story.title = data.stories[i].title;
//       story.author = data.stories[i].author.name;
//       story.time = data.stories[i].publishedAt;
//       story.time = story.time.toISOString().slice(0, 10);
//       if (data.stories[i].media.length < 1) story.img = "";
//       else story.img = data.stories[i].media[0].url;
//       story.source = data.stories[i].source.name;
//       if (data.stories[i].summary.sentences < 1) story.summary = story.title;
//       else story.summary = data.stories[i].summary.sentences[0];
//       story.hashtags = data.stories[i].hashtags.splice(0, 3);
//       story.body = data.stories[i].body;
//       resultList.push(story);
//     }
//     console.log(resultList);
//     var userReference = db.ref("/article/headlines");
//     userReference.set({
//       articles: resultList
//     });
//   }
// };
// apiInstance.listStories(opts, callback);

var jsonQuery = require("json-query");
const iab_qag = require("./iab-qag.json");
const iptc = require("./iptc-subjectcode.json");

const category_data = {
  iab_qag: iab_qag,
  iptc: iptc
};

var id = 11000000;
var res = jsonQuery(["iptc[id=?].label", id], {
  data: category_data
}).value;

console.log(res);
