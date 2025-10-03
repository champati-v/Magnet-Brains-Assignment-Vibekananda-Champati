require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const express = require('express');
const cors = require('cors');
const app = express();  

const jwt = require('jsonwebtoken');
const {authenticationToken} = require('./utils');

app.use(express.json());

app.use(cors({
    origin: "*",
}));

app.get("/", (req, res) => {
    res.json({data: "Hello World!"});
})

app.listen(5000);

module.exports = app;