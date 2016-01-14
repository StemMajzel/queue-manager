/**
* Worker - server
*/
function worker() {
  var express = require('express');
  var functions = require('./functions.js');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var app = express();
  app.get('/', function(request, response) {
    //var a = getRandomInt(1, 100);
    //var b = getRandomInt(1, 100);

    //response.write(String(a) + ', ' + String(b));

    //response.write('returnFibonacci ' + String(functions.returnFibonacci(a)) + ' PID: ' + String(process.pid));
    //response.write('evaluateMath ' + String(functions.evaluateMath("4 + 5 - 4 * 6 + 7")) + ' PID: ' + String(process.pid));
    //response.write('reverseText ' + String(functions.reverseText("Perica reže raci rep")) + ' PID: ' + String(process.pid));
    //response.write('bcryptText ' + String(functions.bcryptText("Traalalal")) + ' PID: ' + String(process.pid));

    //response.json({"foo" : "bar"});
    response.end();
  });

  app.listen(8000);
}

// export functions
module.exports = {
  worker : worker
};
