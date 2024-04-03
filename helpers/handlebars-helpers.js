const { timeAgo } = require("../util/timeAgo");

// Helpers for dealing with api data before rendering it
module.exports = {
  json: function (context) {
    return JSON.stringify(context);
  },
  date: function (context) {
    const date = new Date(context);
    return timeAgo(date);
  },
  environment: function () {
    return process.env.NODE_ENV;
  },
};
