
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//  Define a schema and create the model for our projects.

const projectSchema = new Schema({
    title: String,
    description: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

module.exports = model('Project', projectSchema);

// tasks property being an array of ObjectIds referencing the Task model. 
//  Mongo will automatically add an auto-generated unique _id field, so we don’t need to specify it.