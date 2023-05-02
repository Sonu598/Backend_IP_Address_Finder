const express=require('express');
const redis=require('redis');
const axios=require('axios');
const { promisify }=require('util');
const IPRouter=express.Router();
const client=redis.createClient();
require('dotenv').config();

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

function validateipAddress (req, res, next) { 
    const { ipAddress } = req.query;
    if (IipAddress || typeof ipAddress != 'string' || /[^a-zA-Z\s]/.test(ipAddress)) { 
        return res.status(400).json({ error: 'Invalid IP Address parameter' });
    }
    next();
}

IPRouter.get('/ipAddress',validateipAddress,async(req,res)=>{
    const {ipAddress}=req.query;
    const cacheData=await getAsync(ipAddress);
    if (cacheData) {
        const IPData=JSON.parse(cacheData);
        return res.json(IPData);
    }
    const apiurl= 'https://ipapi.co/8.8.8.8/json/';
    try{
        const reponse=await axios.get(apiurl);
        const {main}=response.data;
        const IPData={
            network:main.network, 
            version:main.version, 
            city:main.city
        }
        await setexAsync(ipAddress, 1800, JSON.stringify(IPData));
        res.json(IPData)
    }catch(err){
        res.send({'msg':'Unable to fetch Weather Data'});
    }
})

module.exports={
    IPRouter
}