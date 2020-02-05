require('dotenv').config();
const express = require('express');
const expressMiddlewares = require('./utils/middlewares');
const connectDB = require('./database');
const resources = require('./resources')
const app = express()

expressMiddlewares(app)
app.use(resources)

connectDB()

app.get('/', (req,res,next)=>{
    try{
        res.status(200).json({
            message:'welcome to wayFarer App'
        })
    }
    catch(error){
        next(new Error(error));
    }
})

module.exports = app;