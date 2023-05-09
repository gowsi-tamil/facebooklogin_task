const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define todo schema
const todo = new Schema({
taskname: {
type: String,
},
desc: {
type: String,
},
completed: {
type: String,
},


createdAt: {
type: Date,
default: Date.now
}
});






const model = mongoose.model("todo", todo);


module.exports = model;