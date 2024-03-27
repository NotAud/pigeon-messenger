module.exports = {
  json: function (context) {
    return JSON.stringify(context);
  },
  auth: function (context) {
    return context.auth;
  },
};
