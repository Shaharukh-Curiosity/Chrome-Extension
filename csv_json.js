//fs is file reading packages for nodejs environment
var fs = require('fs');
var path = require('path');


//sales.csv is excel file where this program is being converted to json format  
var filePath = path.join(__dirname, 'sales.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

// Split on row
f = f.split("\n");

// Get first row for column headers
headers = f.shift().split(",");

var json = [];    
f.forEach(function(d){
    //run for each rows
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    //add data to object in our case tmp
    json.push(tmp);
});

var outPath = path.join(__dirname, 'PATH_TO_JSON');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', 
    function(err){console.log(err);});