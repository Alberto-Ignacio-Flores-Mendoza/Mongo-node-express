const mongoose = require('mongoose')

//structure for the data
// This is what we'll upload to the db
// only these properties will be uploaded 
//however, we are still able to upload empty data
//We have to add a validation 

const TaskScehma = new mongoose.Schema({
    name: { //these are validtors
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characters']
    },

    completed: {
        type: Boolean, 
        default: false,
    }
})



module.exports = mongoose.model('Task', TaskScehma)

