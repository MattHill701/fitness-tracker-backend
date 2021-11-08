// api/users.js
const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
require("dotenv").config();

let mainUser = ''

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});
// NEW
const { getUserById,getAllActivities,getActivityById,createActivity,updateActivity,getRoutineById,
  getAllRoutines,getAllPublicRoutines,getAllRoutinesByUser,getPublicRoutinesByUser,
  getPublicRoutinesByActivity,createRoutine,updateRoutine,destroyRoutine,createUser,getUser, getUserByUsername,
  getRoutineActivitiesByRoutine,addActivityToRoutine,updateRoutineActivity,destroyRoutineActivity,
  attachActivitiesToRoutines } = require('../db');

// UPDATE


usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({
      username,
      password,
    });

    mainUser = username
    console.log(mainUser)
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

usersRouter.post('/login', async (req, res, next) => {
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

    if (user && user.password == password) {
      // create token & return to user
      mainUser = username
      console.log(mainUser)
      res.send({ message: "you're logged in!", token });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  console.log(req.body);
  res.end();
});

usersRouter.get("/me", async (req, res, next) => {
  try{
  const routines = await getAllRoutinesByUser( mainUser );
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
  // res.send("get users me")
});

usersRouter.get("/:username/routines", async (req, res, next) => {
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

let main = mainUser

module.exports = { 
  usersRouter,
  main,
 };