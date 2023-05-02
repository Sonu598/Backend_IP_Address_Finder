const express=require('express');
const { connect } = require('./config/db');
const { userRouter } = require('./controller/user');
const { IPRouter } = require('./controller/ipAddress');
const { authentication } = require('./middleware/authentication');
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.use('/user',userRouter);
app.use(authentication);
app.use('/ipAdress',IPRouter);

app.listen(process.env.Port, async()=>{
    try {
        await connect;
        console.log('Connected to Database');
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Server is running at Port ${Port}`);
})