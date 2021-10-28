async function getRoutineActivityById(id) {
    try {
  
      //return the routine_activity
    } catch (error) {
      throw error;
    }
  }
  async function addActivityToRoutine({ routineId, activityId, count, duration }) {
    try {
  
      //create a new routine_activity, and return it
    } catch (error) {
      throw error;
    }
  }
  async function updateRoutineActivity({ id, count, duration }) {
    try {
  
      //Find the routine with id equal to the passed in id
      //Update the count or duration as necessary
    } catch (error) {
      throw error;
    }
  }
  async function destroyRoutineActivity(id) {
    try {
  
      //remove routine_activity from database
    } catch (error) {
      throw error;
    }
  }
  async function getRoutineActivitiesByRoutine({ id }) {
    try {
  
      //select and return an array of all routine_activity records
    } catch (error) {
      throw error;
    }
  }
  module.exports= {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine
  }