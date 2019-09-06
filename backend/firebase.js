const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rss-pwa-ba0d0.firebaseio.com/"
});

const db = admin.database();

module.exports = db;
