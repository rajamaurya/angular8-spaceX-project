const express = require('express');
const path  = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist'))

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('', async (req,res)=>{
    try{
        let result  = await axios.get('https://api.spaceXdata.com/v3/launches');
        if(result){
            res.status(200).send(result);
        }
    }catch(e){
       res.status(404).send({
           message: `error ${e.message}`
       })
    }
   

})