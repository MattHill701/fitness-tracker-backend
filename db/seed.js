/* 
DO NOT CHANGE THIS FILE
*/
const { client } = require("./client");
const { rebuildDB } = require("./seedData");
 
const {
  createUser,
  createActivity,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllActivities,
  addActivityToRoutine,
} = require("./index");





 rebuildDB()
   .catch(console.error)
   .finally(() => client.end());
