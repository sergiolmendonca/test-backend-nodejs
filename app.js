//require('dotenv').config();
const db = require("./db/db")
var bodyParser = require('body-parser');

const express = require("express");
const mongoose = require("mongoose");

app = express();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);

db.connect()
    .then(() => {
        const routes = require("./routes/noauth/routes")
        app.use("/noauth", routes);
        console.log('connected')
    })
    .catch((err) => {
        console.log(err)
    })
