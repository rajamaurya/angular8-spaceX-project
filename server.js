const express = require('express');
const path  = require('path');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist'))

app.get('/*', (req,res)=>{
    res.sendFile(path.join(___dirname + '/dist/index.html'))
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});
