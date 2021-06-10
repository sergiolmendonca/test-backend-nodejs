const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/AnotaAi_DB').then(() => {
    console.log('connected to mongo');
}).catch(err => {
    console.log(err);
});
