const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://s-mongoteste:teste123@cluster0.0mz8y.mongodb.net/joilsonmadagascar?retryWrites=true&w=majority').then(() => {
    console.log('connected to mongo');
}).catch(err => {
    console.log(err);
});
