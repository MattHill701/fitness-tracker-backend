const express = require('express');
const routinesRouter = express.Router();
const { main } = require('./users');
const {requireUser} = require('./utils')
routinesRouter.use((req, res, next) => {
  console.log("A request is being made to routines");
  next(); // THIS IS DIFFERENT
});
// NEW
const { getUserById,getAllActivities,getActivityById,createActivity,updateActivity,getRoutineById,
  getAllRoutines,getAllPublicRoutines,getAllRoutinesByUser,getPublicRoutinesByUser,
  getPublicRoutinesByActivity,createRoutine,updateRoutine,destroyRoutine,createUser,getUser,
  getRoutineActivitiesByRoutine,addActivityToRoutine,updateRoutineActivity,destroyRoutineActivity,
  attachActivitiesToRoutines } = require('../db');

  routinesRouter.get("/", async (req, res, next) => {
    try{
      const routines = await getAllRoutines();
      if(routines){
        console.log(main)
          res.send(routines);
        } else{
          next({
            name: 'error',
            message: 'getAllRoutines'
          })
        }
    
      } catch ({ name, message }) {
        next({ name, message });
      }
  });

  routinesRouter.post("/", requireUser, async (req, res, next) => {
    const { creatorId, isPublic, name, goal } = req.body;
    try{
        const routine = await createRoutine(req.body);
        if(routine){
            res.send(routine);
          } else{
            next({
              name: 'error',
              message: 'createRoutine'
            })
          }
      
        } catch ({ name, message }) {
          next({ name, message });
        }
  });

  routinesRouter.patch("/:routineId", async (req, res, next) => {
    res.send("patch routineId")
  });

  routinesRouter.delete("/:routineId", async (req, res, next) => {
    const { activityId } = req.params;
    try{
      const close = await destroyRoutine(activityId);
      if(close){
          res.send(close);
        } else{
          next({
            name: 'error',
            message: 'destroyRoutine'
          })
        }
    
      } catch ({ name, message }) {
        next({ name, message });
      }
  });

  routinesRouter.post("/:routineId/activities", async (req, res, next) => {
    const { activityId } = req.params;
    try{
      const close = await destroyRoutine(activityId);
      if(close){
          res.send(close);
        } else{
          next({
            name: 'error',
            message: 'destroyRoutine'
          })
        }
    
      } catch ({ name, message }) {
        next({ name, message });
      }
  });

module.exports = routinesRouter;