const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const taskSchema = new Schema({
    title : String,
    description : String,
    project : {type: Schema.Types.ObjectId, ref:'Project'}
});
module.exports = model('Task', taskSchema);
// En gros on fait un shcéma qui servira de model pour la collection en DB Mongo ? 