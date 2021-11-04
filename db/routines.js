const { client } = require("./client");
const { attachActivitiesToRoutines } = require("./activities");
async function getRoutineById(id) {
  try {
    const {
      rows: [routines],
    } = await client.query(
      `
      SELECT * 
      FROM routines
      WHERE "id"=$1
      `,
      [id]
    );
    //might need to use password
    //  delete users.password
    return routines;
  } catch (error) {
    throw error;
  }
  //select a user using the user's ID. Return the user object.
  //do NOT return the password
}
async function getRoutinesWithoutActivities() {
  try {
    //select and return an array of all routines
  } catch (error) {
    throw error;
  }
}
async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users ON users.id = routines."creatorId";
      `);

    return attachActivitiesToRoutines(routines);
    //select and return an array of all routines, include their activities
  } catch (error) {
    throw error;
  }
}
async function getAllPublicRoutines(id) {
  try {
    //select and return an array of public routines, include their activities
  } catch (error) {
    throw error;
  }
}
async function getAllRoutinesByUser({ username }) {
  try {
    //select and return an array of all routines made by user, include their activities
  } catch (error) {
    throw error;
  }
}
async function getPublicRoutinesByUser({ username }) {
  try {
    //select and return an array of public routines made by user, include their activities
  } catch (error) {
    throw error;
  }
}
async function getPublicRoutinesByActivity({ id }) {
  try {
    //select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities
  } catch (error) {
    throw error;
  }
}
async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routines],
    } = await client.query(
      `
      INSERT INTO routines("creatorId","isPublic", "name", "goal")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [creatorId, isPublic, name, goal]
    );
    //console.log(routines,typeof routines, "createRoutine");

    return routines;
    //create and return the new routine
  } catch (error) {
    throw error;
  }
}
async function updateRoutine({ id, isPublic, name, goal }) {
  try {
    //Find the routine with id equal to the passed in id
    //Don't update the routine id, but do update the isPublic status, name, or goal, as necessary
    //Return the updated routine
  } catch (error) {
    throw error;
  }
}
async function destroyRoutine(id) {
  try {
    //remove routine from database
    //Make sure to delete all the routine_activities whose routine is the one being deleted.
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
