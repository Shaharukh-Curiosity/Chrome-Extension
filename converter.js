const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');const bodyParser = require('body-parser');
var express=require('express')
var app=express();
app.use(bodyParser.urlencoded({ extended: true })); 
var pathofjson = path.join(__dirname,'myjsondata')
var mydata = [];
app.use(bodyParser.json());

app.get('/',function(req,res){

  res.sendFile(__dirname+'/pageview.html')
})
app.post('/csvtojson',function(req,res){

  
        console.log(JSON.stringify(req.body))
        fs.createReadStream(req.body.filename)
        .pipe(csv())
        .on('data', (row) => {
          mydata.push(row);
           

        })
        .on('end', () => {
          
          
          res.json(mydata)  
          fs.writeFileSync(pathofjson,JSON.stringify(mydata), function(err){
               
            console.log(err);
              
          })
        });
     
})
csv({ separator: '\t' });

 
app.listen(8080);