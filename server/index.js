require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const Task = require('./models/task.model');

const express = require('express');
const cors = require('cors');
const app = express();  

const jwt = require('jsonwebtoken');
const authenticationToken = require('./utils');

app.use(express.json());

app.use(cors({
    origin: "*",
}));


//test api
app.get("/", (req, res) => {
    res.json({data: "Hello World!"});
})

//user signup
app.post("/signup", async (req, res) => {
    const {fullName, email, password} = req.body;

    if(!fullName){
        return res
        .status(400)
        .json({error: true, message: "Full name is required"});
    }

    if(!email){
        return res
        .status(400)
        .json({error: true, message: "Email is required"});
    }

    if(!password){
        return res
        .status(400)
        .json({error: true, message: "Password is required"});
    }

    const isUser = await User.findOne({email: email});
    
    if(isUser){
        return res.json({
            error: true,
            message: "User already exists!"
        })
    }

    const user = new User({fullName, email, password});
    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '36000m'
    });

    return res.json({
        error: false,
        message: "User created successfully!",
        accessToken
    });
})

//login
app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email){
        return res
        .status(400)
        .json({error: true, message: "Email is required"});
    }

    if(!password){
        return res
        .status(400)
        .json({error: true, message: "Password is required"});
    }

    const userInfo = await User.findOne({email: email});
    
    if(!userInfo){
        return res.json({
            error: true,
            message: "User not found"
        })
    }

    if(userInfo.email === email && userInfo.password === password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m'
        });
        return res.json({
            error: false,
            message: "Login successful!",
            email,
            accessToken
        });
    } else {
        return res.json({
            error: true,
            message: "Invalid credentials"
        });
    }
})

//add task
app.post("/add-task", authenticationToken, async (req, res) => {
    const {title, description, priority, dueDate} = req.body;
    const user = req.user;

    if(!title){
        return res
        .status(400)
        .json({error: true, message: "Title is required"});
    }

    if(!description){
        return res
        .status(400)
        .json({error: true, message: "Description is required"});
    }

    try{
        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            userId: user._id
        });

        await task.save();

        return res.json({
            error: false,
            message: "Task added successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

})

app.listen(5000);

module.exports = app;