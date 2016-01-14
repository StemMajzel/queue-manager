var cluster = require('cluster');
var worker = require('./worker.js');

var numWorkers = 10;

if (cluster.isMaster) {

  // fork workers
  for (var i = 0; i < numWorkers; i++) {
    var worker = cluster.fork();
  }

  // events
  cluster.on('online', function(worker) {
    console.log('Worker online ' + worker.process.pid);
  });

  cluster.on('exit', function(worker, code, signal) {
    var worker = cluster.fork();
    console.log('New worker forked ' + worker.process.pid + ' (old one died)');
  });

} else {

  // call worker logic
  worker.worker();
}
