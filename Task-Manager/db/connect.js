const mongoose = require("mongoose")


//were technically returning a promise here
const connectDB =(url)=>{
return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    }
    )
}


module.exports = connectDB