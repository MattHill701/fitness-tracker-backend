// require and re-export all files in this db directory (users, activities...)
// const { client } = require('./client')
// const {
//   createUser,
//   getUserByUsername,
//   getUserById,
//   getUser,
// } = require("./users");
// const {
//   getRoutineActivityById,
//   addActivityToRoutine,
//   updateRoutineActivity,
//   destroyRoutineActivity,
//   getRoutineActivitiesByRoutine,
// } = require("./routine_activities");
// const {
//   getActivityById,
//   getAllActivities,
//   createActivity,
//   updateActivity,
// } = require("./activities");
// const {
//   getRoutineById,
//   getRoutinesWithoutActivities,
//   getAllRoutines,
//   getAllPublicRoutines,
//   getAllRoutinesByUser,
//   getPublicRoutinesByUser,
//   getPublicRoutinesByActivity,
//   createRoutine,
//   updateRoutine,
//   destroyRoutine,
// } = require("./routines");

module.exports = {
  ...require("./users"), // adds key/values from users.js
  ...require("./activities"), // adds key/values from activites.js
  ...require("./routines"), // etc
  ...require("./routine_activities"),
  ...require("./client"), // etc
};
