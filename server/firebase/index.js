const admin = require("firebase-admin");

// https://medium.com/@tanya/configuring-firebase-admin-sdk-with-express-931b02ee2f91
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

module.exports = admin;
