//require('dotenv').config();
var cors = require("cors")
const db = require("./db/db")
var bodyParser = require('body-parser');

const express = require("express");
const mongoose = require("mongoose");

app = express();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors())

const port = process.env.SERVER_PORT || 3001;



db.connect()
    .then(() => {
        console.log('connected')
        const server = app.listen(port, () =>
        console.log(`Server running on port ${port}`)
        );
    })
    .catch((err) => {
        console.log(err)
    })

    const routes = require("./routes/noauth/routes")
    app.use("/noauth", routes);

module.exports = app
