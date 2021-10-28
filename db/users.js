//createUser, createActivity, createRoutine, getRoutinesWithoutActivities, getAllActivities, addActivityToRoutine
//npm run seed:dev

const { client } = require("./client");

 
  
async function createUser({ username, password } ) {
  try { const{ rows: [users], 
} = await client.query(
    `
    INSERT INTO users(username, password)
    VALUES($1, $2)
    RETURNING * ;
  `,[username, password])
      
    return users
//make sure to hash the password before storing it to the database
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
    try {
      const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE "username" = ${username};
      `);
  //might need to use password
      return user;
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
