const AylienNewsApi = require("aylien-news-api");
const apiInstance = new AylienNewsApi.DefaultApi();
const app_id = apiInstance.apiClient.authentications["app_id"];
app_id.apiKey = "3d093937";
const app_key = apiInstance.apiClient.authentications["app_key"];
app_key.apiKey = "0a12e7300e4d8116d854225798195557";

module.exports = apiInstance;
