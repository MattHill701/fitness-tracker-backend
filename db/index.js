// require and re-export all files in this db directory (users, activities...)
// const { client } = require('./client')


module.exports = {
  ...require("./users"), // adds key/values from users.js
  ...require("./activities"), // adds key/values from activites.js
  ...require("./routines"), // etc
  ...require("./routine_activities"),
  ...require("./client"), // etc
};
