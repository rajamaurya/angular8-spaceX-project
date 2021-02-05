const express = require('express');
const path  = require('path');
const cors = require('cors');
const axios = require('axios');
const circularJSON =  require('circular-json');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/sapi'))

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://spacex-musk.herokuapp.com/');
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

app.get('/space-api', async (req,res)=>{
    const query =  req.query;
    console.log(query)
    const url = `https://api.spaceXdata.com/v3/launches`;
    try{
        let result  = await axios.get(url, {
            params: query
        });
        if(result){
            res.status(200).json({
                status: "SUCCESS",
                data: result['data']
            })
        }
        
    }catch(e){
       res.status(404).send({
           msg: `error ${e.message}`
       })
    }
   

})
app.use('', async (req,res)=>{
    res.sendFile(path.join(__dirname + '/dist/sapi/index.html'));
  
})