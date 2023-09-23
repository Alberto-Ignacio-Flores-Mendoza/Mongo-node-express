const Task = require('../models/task')

const asyncWrapper = require('../middleware/async')

const {createCustomError} =require('../errors/custom-error')

//Get all tasks---------------------------------

const getAllTasks = asyncWrapper(async(req,res)=>{

        const tasks = await Task.find({})
        res.status(200).json({tasks})
        //other options 
        //just pick one and stick to it
        //res.status(200).json({tasks,amount: tasks.length})
        //res.status(200).json({success: true, data: {tasks,nbHits: tasks.length}})
})

//Create task ----------------------------------

const createTask = asyncWrapper(async (req,res)=>{
        const task= await Task.create(req.body)
        res.status(201).json({task}) 

})


//Get a single task -----------------------------------------
const getTask = asyncWrapper(async(req,res,next)=>{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))

        }

        res.status(200).json({task})


    
})


//delete tasks ----------------------------------------------
const deleteTask = asyncWrapper(async(req,res)=>{

        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID})
        
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
        
})


// update a task ----------------------------------------------
const updateTask = asyncWrapper(async(req,res)=>{

    
        const {id: taskID} = req.params;
        

        //we need the options object here 
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true,
        })
        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}


//originally each task had this format but we changed it to be wrapped inside a middleware instead

/* const createTask = async (req,res)=>{
    try {
        const task= await Task.create(req.body)
        res.status(201).json({task }) 
    } catch (error) {
        res.status(500).json({msg: error})
    }
  

}
 */