require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;

//Mongo DB connection
const mongoose = require('mongoose');
mongoose.connect(connectionString);

//importing models
const User = require('./models/user.model');
const Task = require('./models/task.model');

const express = require('express');
const cors = require('cors');
const app = express();  

//JWT token
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
    const {user} = req.user;

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
            dueDate: dueDate || null,
            userId: user._id
        });

        await task.save();

        return res.json({
            error: false,
            message: "Task added successfully!"
        });

    } catch (error) {
        console.log("HERE IS THE ERROR",error)
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

})

//edit-task
app.post("/edit-task/:taskId", authenticationToken, async (req, res) => {
    const taskId = req.params.taskId;
    const {title, description, priority, status, dueDate} = req.body;
    const {user} = req.user;

    if(!title || !description){
        return res
        .status(400)
        .json({error: true, message: "No Changes Made"});
    }

    try{
        const task = await Task.findOne({ _id: taskId, userId: user._id }); 

        if (!task) {
            return res.status(404).json({
                error: true,
                message: "Task not found"
            });
        }

        if(title) task.title = title;
        if(description) task.description = description;
        if(priority) task.priority = priority;
        if(status) task.status = status;
        if(dueDate) task.dueDate = dueDate;

        await task.save();

        return res.json({
            error: false,
            message: "Task Updated successfully!"
        });

    } catch (error) {
        console.log("HERE IS THE ERROR",error)
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }

})

//get-tasks
app.get("/get-all-tasks", authenticationToken, async (req, res) => {
    const {user} = req.user;

    try{
        const tasks = await Task.find({userId: user._id}).sort({dueDate: 1});

        return res.json({
            error: false,
            tasks,
            message: "Tasks fetched successfully!"
        });
    } catch (error) {
        console.log("HERE IS THE ERROR",error)
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
})

app.listen(5000);

module.exports = app;