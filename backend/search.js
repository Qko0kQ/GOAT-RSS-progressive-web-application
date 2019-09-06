const express = require("express");
const router = express.Router();
const apiInstance = require("./constructor");
var jsonQuery = require("json-query");
const iab_qag = require("./iab-qag.json");
const iptc = require("./iptc-subjectcode.json");
const category_data = {
  iab_qag: iab_qag,
  iptc: iptc
};

/**Search news according to keyword through online api*/
router.get("/:keyword", function(req, res) {
  var keyword = req.params.keyword;
  var opts = {
    title: keyword,
    sortBy: "relevance",
    language: ["en"],
    publishedAtStart: "NOW-7DAYS",
    publishedAtEnd: "NOW",
    perPage: 100
  };
  var resultList = [];
  var callback = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
      for (var i = 0; i < data.stories.length; i++) {
        var story = {
          newsId: "",
          title: "",
          category: "",
          author: "",
          time: "",
          img: "",
          source: "",
          sourceUrl: "",
          summary: "",
          hashtags: [],
          body: ""
        };
        story.newsId = data.stories[i].id;
        story.title = data.stories[i].title;
        if (data.stories[i].categories.length < 1) story.category = "";
        else {
          var taxonomy = data.stories[i].categories[0].taxonomy;
          var category_id = data.stories[i].categories[0].id;
          if (taxonomy === "iab-qag") {
            story.category = jsonQuery(["iab_qag[id=?].label", category_id], {
              data: category_data
            }).value;
          } else {
            story.category = jsonQuery(["iptc[id=?].label", category_id], {
              data: category_data
            }).value;
          }
        }
        story.author = data.stories[i].author.name;
        story.time = data.stories[i].publishedAt;
        story.time = story.time.toISOString().slice(0, 10);
        story.img =
          data.stories[i].media.length < 1 ? "" : data.stories[i].media[0].url;
        story.source = data.stories[i].source.name;
        story.sourceUrl = data.stories[i].source.homePageUrl;
        story.summary =
          data.stories[i].summary.sentences < 1
            ? story.title
            : data.stories[i].summary.sentences[0];
        story.hashtags = data.stories[i].hashtags.splice(0, 3);
        story.body = data.stories[i].body;
        resultList.push(story);
      }
    }
    res.send(resultList);
  };
  apiInstance.listStories(opts, callback);
});

/**Search news according to category through online api*/
router.get("/category/:category", function(req, res) {
  var category = req.params.category;
  var category_id;
  if (category === "business") category_id = "04018000";
  if (category === "entertainment") category_id = "01021000";
  if (category === "health") category_id = "07000000";
  if (category === "science") category_id = "13009000";
  if (category === "sports") category_id = "15000000";
  if (category === "technology") category_id = "13010000";
  if (category === "politics") category_id = "11000000";
  var opts = {
    sortBy: "relevance",
    language: ["en"],
    categoriesId: [category_id],
    categoriesTaxonomy: "iptc-subjectcode",
    publishedAtStart: "NOW-7DAYS",
    publishedAtEnd: "NOW",
    perPage: 100
  };
  var resultList = [];
  var callback = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
      for (var i = 0; i < data.stories.length; i++) {
        var story = {
          newsId: "",
          title: "",
          category: category,
          author: "",
          time: "",
          img: "",
          source: "",
          sourceUrl: "",
          summary: "",
          hashtags: [],
          body: ""
        };
        story.newsId = data.stories[i].id;
        story.title = data.stories[i].title;
        story.author = data.stories[i].author.name;
        story.time = data.stories[i].publishedAt;
        story.time = story.time.toISOString().slice(0, 10);
        story.img =
          data.stories[i].media.length < 1 ? "" : data.stories[i].media[0].url;
        story.source = data.stories[i].source.name;
        story.sourceUrl = data.stories[i].source.homePageUrl;
        story.summary =
          data.stories[i].summary.sentences < 1
            ? story.title
            : data.stories[i].summary.sentences[0];
        story.hashtags = data.stories[i].hashtags.splice(0, 3);
        story.body = data.stories[i].body;
        resultList.push(story);
      }
    }
    res.send(resultList);
  };
  apiInstance.listStories(opts, callback);
});

module.exports = router;
