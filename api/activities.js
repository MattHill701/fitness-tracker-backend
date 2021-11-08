const express = require('express');
const activitiesRouter = express.Router();
const { getUserById,getAllActivities,getActivityById,createActivity,updateActivity,getRoutineById,
  getAllRoutines,getAllPublicRoutines,getAllRoutinesByUser,getPublicRoutinesByUser,
  getPublicRoutinesByActivity,createRoutine,updateRoutine,destroyRoutine,createUser,getUser,
  getRoutineActivitiesByRoutine,addActivityToRoutine,updateRoutineActivity,destroyRoutineActivity,
  attachActivitiesToRoutines } = require('../db');


activitiesRouter.use((req, res, next) => {
  console.log("A request is being made to activities");

  next(); // THIS IS DIFFERENT
});

activitiesRouter.get("/", async (req, res, next) => {
  try{
    const activities = await getAllActivities();
    if(activities){
        res.send(activities);
      } else{
        next({
          name: 'error',
          message: 'getAllActivities'
        })
      }
  
    } catch ({ name, message }) {
      next({ name, message });
    }
});

activitiesRouter.post("/", async (req, res, next) => {
  const { name, description } = req.body;
  try{
      const activity = await createActivity(req.body);
      if(activity){
          res.send(activity);
        } else{
          next({
            name: 'error',
            message: 'createActivity'
          })
        }
    
      } catch ({ name, message }) {
        next({ name, message });
      }
});

activitiesRouter.patch("/:activityId", async (req, res, next) => {
  res.send("patch activityId")
});

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try{
  const routines = await getPublicRoutinesByActivity( activityId );
  if(routines){
      res.send(routines);
    } else{
      res.send("routine error")
      next({
        name: 'error',
        message: 'cannot get routines for this activity'
      })
    }

  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;

// curl http://localhost:3000/api/posts -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2MzQ1MjEyNjksImV4cCI6MTYzNTEyNjA2OX0.4Xu_kZ8ZVfdktOW9HI6v2qvTTOp9Ux-nJn2ijSXVbo0'