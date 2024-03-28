const { timeAgo } = require("../util/timeAgo");

module.exports = {
  json: function (context) {
    return JSON.stringify(context);
  },
  date: function (context) {
    const date = new Date(context);
    return timeAgo(date);
  },
};
