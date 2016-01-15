var functions = require('./functions.js');

/**
* Worker - process
*/
function worker() {
  process.on('message', function(message) {

    // add process id to message (just for info)
    message.pid = process.pid;

    // check if function exists, and run it
    if (functions.service[message.function]) {
      var fn = functions.service[message.function];
      message.result = fn(message.param);
    } else {
      message.result = 'Function not found';
    }

    process.send(message);
  });
}

// export functions
module.exports = {
  worker : worker
};
