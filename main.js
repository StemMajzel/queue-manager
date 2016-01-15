var cluster = require('cluster');
var worker = require('./worker.js');
var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

/**
* Number of workers that you need
*/
var numWorkers = 10;

/**
* Stored spawned workers
*/
var spawnedWorkers = {};

/**
* Stored IDs of free workers
*/
var freeWorkers = [];

/**
* Jobs queue
*/
var jobs = [];

/**
* Job ID counter
*/
var jobIdentification = 0;

/**
* Set true to output debug information to console
*/
var debug = false;

/**
* Add job to queue
* @param object job Job packed in a neat object
* @return int job id
*/
function addJob(job) {
  jobIdentification++;
  job.job_id = jobIdentification;
  jobs.push(job);
  return jobIdentification;
}

/**
* Main loop - checks job queue, and assigns job to free worker
*/
function mainLoop() {
  if  (jobs.length > 0) {
    var fw = freeWorkers.shift();
    if (fw) {
      var job = jobs.shift();
      spawnedWorkers[fw].send(job);
    }
  }
  setImmediate(mainLoop);
}

/**
* Fork new worker
* @return object forked worker
*/
function forkWorker() {
  var worker = cluster.fork();
  worker.on('message', function(message){
    // if worker message includes result, eventEmitter emitts "jobDone" and worker gets pushed to freeWorkers queue
    if (message.result) {
      if (debug) {
        console.log(message);
      }
      freeWorkers.push(this.id);
      eventEmitter.emit('jobDone', message);
    }
  });

  // store spawned worker
  spawnedWorkers[worker.id] = worker;
  freeWorkers.push(worker.id);

  return worker;
}

if (cluster.isMaster) {
  for (var i = 0; i < numWorkers; i++) {
    forkWorker();
  }

  // start main loop
  mainLoop();

  console.log('Queue manager running...');

  // worker becomes alive
  cluster.on('online', function(worker) {
    if (debug) {
      console.log('Worker online ' + worker.process.pid);
    }
  });

  // worker exits
  cluster.on('exit', function(worker, code, signal) {
    delete spawnedWorkers[worker.id];
    for (var w in freeWorkers) {
      if (freeWorkers[w] = worker.id) {
        delete freeWorkers[w];
      }
    }

    // fork new worker
    var worker = forkWorker();
  });

  http.createServer(function(request, response) {

    // favicon request - just end it
    if (request.url === '/favicon.ico') {
      response.writeHead(200, {'Content-Type': 'image/x-icon'});
      response.end();
      return;
    }

    if (request.url === '/test.html') {
      fs.readFile(require('path').resolve(__dirname, 'test.html'), function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        response.write(data);
        response.end();
      });
      return;
    }

    // function request
    var query = url.parse(request.url, true).query;
    if (debug) {
      console.log(query);
    }

    // check query
    if (Object.keys(query).length == 2 && query.function && query.param) {
      var job_id = addJob(query);
      if (job_id && debug) {
        console.log('Job added : ' + job_id);
      }
    }
    else {
      response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
      response.write(JSON.stringify({
        result : 'Invalid or missing parameter'
      }));
      response.end();
      return;
    }

    // begin response
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    // wait until job is done and then response.end
    eventEmitter.on('jobDone', jobDoneCallback);

    function jobDoneCallback(message) {
      if (job_id == message.job_id) {
        response.write(JSON.stringify(message));
        response.end();
        eventEmitter.removeListener('jobDone', jobDoneCallback);
      }
    }

  }).listen(8000);

} else {
  // process
  worker.worker();
}
