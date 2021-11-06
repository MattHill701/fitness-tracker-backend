// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById,getAllActivities,getActivityById,createActivity,updateActivity,getRoutineById,
  getAllRoutines,getAllPublicRoutines,getAllRoutinesByUser,getPublicRoutinesByUser,
  getPublicRoutinesByActivity,createRoutine,updateRoutine,destroyRoutine,createUser,getUser,
  getRoutineActivitiesByRoutine,addActivityToRoutine,updateRoutineActivity,destroyRoutineActivity,
  attachActivitiesToRoutines } = require('../db');
const { JWT_SECRET } = process.env;


  // set `req.user` if possible
  apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

  apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
  
    next();
  });

apiRouter.get("/health", async (req, res, next) => {
    res.send("all is well.")
  });

apiRouter.post('/users/register', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }

      if(password.length < 8){
        next({
          name: 'Password',
          message: 'its too short'
        });
      }
  
      const user = await createUser({
        username,
        password
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({ 
        message: "thank you for signing up",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });

  apiRouter.post('/users/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await getUserByUsername(username);
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      if (user && user.password === password) {
        // create token & return to user
        res.send({ message: "you're logged in!", token });
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'username or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
  });

  apiRouter.get("/users/me", async (req, res, next) => {
    // try{
    //   //work in progress
    //   const token = jwt.sign({ 
    //     id: user.id, 
    //     username
    //   }, process.env.JWT_SECRET, {
    //     expiresIn: '1w'
    //   });

    // if(token){
    //     res.send(user);
    //   } else{
    //     next({
    //       name: 'error',
    //       message: 'token not supplied'
    //     })
    //   }
  
    // } catch ({ name, message }) {
    //   next({ name, message });
    // }
    res.send("get users me")
  });

  apiRouter.get("/users/:username/routines", async (req, res, next) => {
    const { username } = req.params;
    try{
    const routines = await getAllRoutinesByUser( username );
    if(routines){
        res.send(routines);
      } else{
        next({
          name: 'error',
          message: 'cannot get routines for this user'
        })
      }
  
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  apiRouter.get("/activities", async (req, res, next) => {
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

  apiRouter.post("/activities", async (req, res, next) => {
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

  apiRouter.patch("/activities/:activityId", async (req, res, next) => {
    res.send("patch activityId")
  });

  apiRouter.get("/activities/:activityId/routines", async (req, res, next) => {
    const { activityId } = req.params;
    try{
    const routines = await getPublicRoutinesByActivity( activityId );
    if(routines){
        res.send(routines);
      } else{
        next({
          name: 'error',
          message: 'cannot get routines for this activity'
        })
      }
  
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  apiRouter.get("/routines", async (req, res, next) => {
    try{
      const routines = await getAllRoutines();
      if(routines){
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

  apiRouter.post("/routines", async (req, res, next) => {
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

  apiRouter.patch("/routines/:routineId", async (req, res, next) => {
    res.send("patch routineId")
  });

  apiRouter.delete("/routines/:routineId", async (req, res, next) => {
    try{
      const close = await destroyRoutine(req.body.id);
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

  apiRouter.post("/routines/:routineId/activities", async (req, res, next) => {
    res.send("patch routineId activities")
  });

  apiRouter.patch("/routine_activities/:routineActivityId", async (req, res, next) => {
    res.send("patch routineActivityId")
  });

  apiRouter.delete("/routine_activities/:routineActivityId", async (req, res, next) => {
    res.send("delete routineActivityId")
  });

  module.exports = apiRouter;
