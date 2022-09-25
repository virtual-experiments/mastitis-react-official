// import * as path from 'path';

var express = require("express");
var router = express.Router();


// var fs = require("fs");
// var csv = require("jquery-csv");
const csvWriter = require('csv-writer');
// router.get("/", function(req, res, next) {
//     res.send("API is working properly");
// });

router.post('/',function(request, response){
    // console.log(request.body);      // your JSON
    console.log(typeof(request.body[0]))

    const writer = csvWriter.createObjectCsvWriter({
      path: 'logs/countries.csv',
      header: [
        { id: 'FarmID', title: 'FarmID' },
        { id: 'CowID', title: 'CowID' },
        { id: 'AAmilk', title: 'AAmilk' },
        { id: 'BNO', title: 'BNO' },
        { id: 'nDayLact', title: 'nDayLact' },
        { id: 'Parity', title: 'Parity' },
        { id: 'Challenge', title: 'Challenge' },
        { id: 'Vaccine', title: 'Vaccine' },
        { id: 'Initmilk', title: 'Initmilk' },
        { id: 'Finalmilk', title: 'Finalmilk' },
      ],
    });
    console.log(writer.path)
    
    writer.writeRecords(request.body).then(() => {
      console.log('Done!');
    });

    response.send(request.body);    // echo the result back
  });

module.exports = router;


