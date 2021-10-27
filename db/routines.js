async function getRoutineById(id) {
    try {
  
      //return the routine
    } catch (error) {
      throw error;
    }
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
    destroyRoutine
  }