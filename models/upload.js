const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define todo schema


const imageSchema = new mongoose.Schema({

    name:String,
    image:{
        data:Buffer,
        contentType:String
    }
})

const model2 = mongoose.model('Image',imageSchema)




module.exports = model2;

