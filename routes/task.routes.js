// Express et Mongoose 
const router = require("express").Router();
// const mongoose = require('mongoose');

//Models
const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

// POST /api/tasks - Creates a new task
router.post('/tasks',(req, res, next)=>{
    const {title, description, projectId} = req.body; // récup body dans la req

    Task.create({title, description, project : projectId}) // créa une tache avec récup
    .then(newTask => { 
        // Avec créa, on cherche le projet par id avec projectId et on y ajoute la task 
        return Project.findByIdAndUpdate(projectId, {$push: {tasks: newTask._id}});
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});
module.exports = router;

// This route performs 2 actions on DB: 
//Creates a new task and Updates an existing project. 
//Once the -new task document- is created, we use its _id 
//to update the corresponding -project document-. 
//We update the project document by pushing the _id of the new task to the tasks array

// We need to import this file with the tasks routes, using require(), 
// and set it up as the routes middleware in the app.js: