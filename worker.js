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
    var a = getRandomInt(1, 100);
    var b = getRandomInt(1, 100);

    response.write('PID ' + String(process.pid) + "\n");

    response.write(String(a) + ', ' + String(b) + "\n");

    response.write('returnFibonacci ' + String(functions.returnFibonacci(a)) + "\n");
    response.write('evaluateMath ' + String(functions.evaluateMath("4 + 5 - 4 * 6 + 7")) + "\n");
    response.write('reverseText ' + String(functions.reverseText("Perica reže raci rep")) + "\n");
    response.write('bcryptText ' + String(functions.bcryptText("Traalalal")) + "\n");

    //response.json({"foo" : "bar"});
    response.end();
  });

  app.listen(8000);
}

// export functions
module.exports = {
  worker : worker
};
