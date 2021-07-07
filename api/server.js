const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser=require("cookie-parser")
const {restrict} = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();
server.use(cookieParser())
server.use(helmet());
server.use(cors());
server.use(express.json());
server.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"Welcome to our API"
    })
})

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter);

module.exports = server;
