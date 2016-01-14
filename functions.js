/**
* Returns n-th Fibonacci number
* @param integer n place in Fibonacci sequence
* @return integer result of Fibonacci function
*/
function returnFibonacci(n) {
  var f = 0, f2 = 0, f1 = 1;
  var nabs = Math.abs(n);

  for (var i = 0; i < nabs; i++) {
    f = f2 + f1;
    f1 = f2;
    f2 = f;
  }

  if (n < 0) {
    f = (nabs % 2) ? f : -f;
  }
  return f;
}

/**
* Evaulates arithmetic problem and returns solution - uses mathjs
* @param string problem math problem e.g. "3 + 4 * 5"
* @return number solution
*/
function evaluateMath(problem) {
  var math = require('mathjs');
  return math.eval(problem);
}

/**
* Returns reversed string
* @param string str input string
* @return string reversed string
*/
function reverseText(str) {
  var r = '';
  for (var i = str.length - 1; i >= 0; i--) {
    r += str[i];
  }
  return r;
}

/**
* Returns Bcrypt of passed string
* @param string str input string
* @return string bcrypted string
*/
function bcryptText(str) {
  var bcrypt = require('bcrypt-nodejs');
  return bcrypt.hashSync(str);
}

// export functions
module.exports = {
  returnFibonacci : returnFibonacci,
  evaluateMath : evaluateMath,
  reverseText : reverseText,
  bcryptText : bcryptText
};
