//this is a REST API
//representational state transport
//combienes routes and data
//this is just pattern
//not stictly enforced
const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json()) // if we dont use this we wont have our data in req.body


//routes
//there should be get requests that get our list items
//post request to insert data
//delete to delte data
//get request in the update task
//update to edit data

app.get('/hello', (req, res)=>{
    res.send('Task Manager App')
})

// /api/vi/  this set up is usefull if we update versions eventually

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000; 


const start =async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen( port, (req,res)=>{
        console.log(`server is Listening on port ${port} `)
})
    } catch (error) {
        console.log(error)
    }
}

start()
