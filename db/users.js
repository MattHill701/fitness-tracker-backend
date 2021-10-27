//createUser, createActivity, createRoutine, getRoutinesWithoutActivities, getAllActivities, addActivityToRoutine
//npm run seed:dev

 
  
async function createUser({ username, password }) {
  try {

//make sure to hash the password before storing it to the database
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {

//this should be able to verify the password against the hashed password
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {

//select a user using the user's ID. Return the user object.
//do NOT return the password
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {

//select a user using the user's username. Return the user object.
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getUser,
};
