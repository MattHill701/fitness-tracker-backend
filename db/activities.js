  const {client } = require("./client")
  
  async function getActivityById(id) {
    try {
      const { rows: [activity] } = await client.query(`
      SELECT * FROM activities
      WHERE id = $1;
  `, [id]);

  return activity;
    } catch (error) {
      throw error;
    }
  }
  async function getAllActivities() {
    
    try {
      const { rows: activities } = await client.query(`
      SELECT * 
      FROM activities;
  `);

  return activities;
    } catch (error) {
      throw error;
    }
  }
  async function createActivity({ name, description }) {
    try { 
      const { rows: [activity] } = await client.query(`
            INSERT INTO activities(name, description)
            VALUES ($1, $2)
            RETURNING *;
        `, [name, description]);

        return activity;
  
  //make sure to hash the password before storing it to the database
    } catch (error) {
      throw error;
    }
  }
  async function updateActivity({ id, name, description }) {
    try {
      const { rows: [activity] } = await client.query(`
      UPDATE activities
      SET name = $2, 
      description = $3
      WHERE id = $1
      RETURNING *
  `, [id, name, description]);

  return activity;
     // don't try to update the id...
     // do update the name and description
     // return the updated activity 
    } catch (error) {
      throw error;
    }
  }
  async function attachActivitiesToRoutines(routines) {
    // no side effects
    const routinesToReturn = [...routines];
    const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
    const routineIds = routines.map(routine => routine.id);
    if (!routineIds?.length) return;
    try {
      // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
      const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
        FROM activities
        JOIN routine_activities ON routine_activities."activityId" = activities.id
        WHERE routine_activities."routineId" IN (${ binds });
      `, routineIds);
      // loop over the routines
      for(const routine of routinesToReturn) {
        // filter the activities to only include those that have this routineId
        const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
        // attach the activities to each single routine
        routine.activities = activitiesToAdd;
      }
      return routinesToReturn;
    } catch (error) {
      throw error;
    }
  }
module.exports = {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity,
    attachActivitiesToRoutines
}

