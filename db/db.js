const mongoose = require("mongoose");
const db = require("../config/config")
const connect =  () =>{
    return mongoose.connect(db.dbURL,{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}

module.exports = {
    connect
}