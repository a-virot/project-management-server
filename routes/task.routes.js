// Express et Mongoose 
const router = require("express").Router();
const mongoose = require('mongoose');

//Models
const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

// POST /api/tasks - Creates a new task
router.post('/tasks',(req, res, next)=>{
    const {title, description, projectId} = req.body; // récup body dans la req. Dans body on a tout ça, cf front AddTask.js newTaskRequestBody 

    Task
    .create({title, description, project : projectId}) // créa une task avec récup
    .then(newTask => { 
        // Avec newTask, on cherche le projet par id avec projectId et on y ajoute la task 
        return Project.findByIdAndUpdate(projectId, {$push: {tasks: newTask._id}});
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// GET api/tasks/:tasksId - Retrives a specific task by id
router.get("/tasks/:taskId", (req,res,next)=>{
    const{taskId}=req.params;
    if(!mongoose.Types.ObjectId.isValid(taskId)){
        res.status(400).json({message : 'Task specified id is not valid'})
        return;
    }
    Task.findById(taskId)
    .then(task => res.status(200).json(task))
    .catch(error=>res.json(error));
})

// PUT api/tasks/:tasksId - Updates a specific task by id 
router.put('/tasks/:taskId', (req, res, next)=>{
    const {taskId}= req.params;

    if(!mongoose.Types.ObjectId.isValid(taskId)){
        res.status(400).json({message:'Task specified id is not valid'})
        return;
    }

    Task.findByIdAndUpdate(taskId, req.body,{new:true})
    .then((updatedTask)=>res.json(updatedTask))
    .catch(error => res.json(error))
})

// DELETE api/tasks/:tasksId - Deletes a specific task by id
router.delete('/tasks/:taskId', (req, res, next)=>{
    const {taskId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(taskId)){
        res.status(400).json({message : 'Specified task id is not valid'})
        return;
    }

    Task.findByIdAndDelete(taskId)
    .then(()=> res.json({message: `Task with id ${taskId} is removed successfully.` }))
    .catch(error=>res.json(error));
});

module.exports = router;

// This route performs 2 actions on DB: 
// Creates a new task and Updates an existing project. 

// Once the -new task document- is created, we use its _id 
// to update the corresponding -project document-. 
// We update the project document by pushing the _id of the new task to the tasks array

// We need to import this file with the tasks routes, using require(), 
// and set it up as the routes middleware in the app.js: