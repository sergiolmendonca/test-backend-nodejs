require('dotenv').config();

const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");

class App {
  constructor() {
    this.app = express();

    this.database();
    this.middlewares();
    this.routes();

    const port = process.env.SERVER_PORT || 3001;

    this.app.listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
  }

  database() {
    mongoose.connect(db.uri,{ 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(require("./routes"));
  }
}
module.exports = new App().app;