const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    actor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Actor'
    },
    director:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Director'
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    releaseDate:{
        type:Date,
        required:true
    },
    description:{
        type:String 
    }

})

module.exports = mongoose.model('Movie',movieSchema)