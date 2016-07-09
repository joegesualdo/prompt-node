module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _chalk = __webpack_require__(1);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _readline = __webpack_require__(2);

	var _readline2 = _interopRequireDefault(_readline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Prompt = function () {
	  function Prompt() {
	    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var _ref$type = _ref.type;
	    var type = _ref$type === undefined ? 'string' : _ref$type;
	    var _ref$hidden = _ref.hidden;
	    var hidden = _ref$hidden === undefined ? false : _ref$hidden;
	    var _ref$required = _ref.required;
	    var required = _ref$required === undefined ? false : _ref$required;
	    var _ref$validation = _ref.validation;
	    var validation = _ref$validation === undefined ? function () {
	      return true;
	    } : _ref$validation;

	    _classCallCheck(this, Prompt);

	    // Set instance properties
	    this.text = text;
	    this.type = type;
	    this.hidden = hidden;
	    this.required = required;
	    this.validation = validation;
	    this.onDone = function () {};
	    this.onChange = function () {};
	    this.onKeypress = function () {};
	    this.onBackspace = function () {};
	    this.onValidationError = function () {};
	  }

	  _createClass(Prompt, [{
	    key: 'on',
	    value: function on(type, fn) {
	      switch (type) {
	        case 'backspace':
	          this.onBackspace = fn;
	          break;
	        case 'keypress':
	          this.onKeypress = fn;
	          break;
	        case 'change':
	          this.onChange = fn;
	          break;
	        case 'done':
	          this.onDone = fn;
	          break;
	        case 'validationError':
	          this.onValidationError = fn;
	          break;
	        default:
	      }

	      return this;
	    }
	  }, {
	    key: 'begin',
	    value: function begin() {
	      var instance = this;
	      _readline2.default.emitKeypressEvents(process.stdin);
	      process.stdin.setRawMode(true);

	      // Variables
	      var answer = '';
	      var answerCursorPos = 0;
	      var readlineInterface = _readline2.default.createInterface({
	        input: process.stdin
	      });

	      // Create event listener functions
	      function onKeypress(str, key) {
	        if (key && key.ctrl && key.name === 'c') {
	          process.emit('SIGINT');
	        } else if (key && key.name === 'left') {
	          answerCursorPos--;
	          process.stdout.cursorTo(instance.text.length + 1 + answerCursorPos);
	        } else if (key && key.name === 'right') {
	          if (answerCursorPos !== answer.length) {
	            answerCursorPos++;
	            process.stdout.cursorTo(instance.text.length + 1 + answerCursorPos);
	          }
	        } else if (key && key.name === 'up') {
	          // Do something
	        } else if (key && key.name === 'down') {
	          // Do something
	        } else if (key && key.name === 'return') {
	          // Do something
	        } else if (key && key.name === 'backspace') {
	          answerCursorPos--;
	          process.stdout.clearLine();
	          process.stdout.cursorTo(0);
	          answer = answer.slice(0, answer.length - 1);
	          if (instance.hidden) {
	            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
	          } else {
	            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
	          }
	          process.stdout.cursorTo(instance.text.length + 1 + answerCursorPos);
	          instance.onBackspace();
	        } else {
	          var oldAnswer = answer;
	          answer = insert(answer, str, answerCursorPos);
	          answerCursorPos++;
	          process.stdout.clearLine();
	          process.stdout.cursorTo(0);
	          if (instance.hidden) {
	            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
	          } else {
	            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
	          }
	          process.stdout.cursorTo(instance.text.length + 1 + answerCursorPos);

	          instance.onChange(oldAnswer, answer);
	        }
	        instance.onKeypress(str, key);
	      }

	      function onSigint() {
	        process.exit();
	      }

	      function onEnter() {
	        // Checks if validation fails OR if answer is empty string
	        if (!instance.validation(answer) || instance.required && stringIsEmpty(answer)) {
	          process.stdout.clearLine();
	          process.stdout.cursorTo(0);
	          if (instance.hidden) {
	            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
	          } else {
	            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
	          }
	          process.stdout.cursorTo(instance.text.length + 1 + answerCursorPos);
	        } else {
	          process.stdout.write('\n');
	          // clean listeners
	          process.removeListener('SIGINT', onSigint);
	          process.stdin.removeListener('keypress', onKeypress);
	          process.stdin.setRawMode(false);
	          readlineInterface.close();
	          instance.onDone(answer);
	        }
	      }

	      // Attach event listeners
	      process.stdin.on('keypress', onKeypress);
	      process.on('SIGINT', onSigint);
	      readlineInterface.on('line', onEnter);

	      // Create the prompt
	      process.stdout.write(instance.text + ' ');
	    }
	  }]);

	  return Prompt;
	}();

	function insert(str, what, index) {
	  if (str.length === 0) {
	    return what;
	  }
	  return index > 0 ? str.replace(new RegExp('.{' + index + '}'), '$&' + what) : what + str;
	}

	function stringIsEmpty(str) {
	  return str.split('').every(function (char) {
	    return char === ' ';
	  });
	}

	function convertStringToHidden(str) {
	  var hiddenChar = arguments.length <= 1 || arguments[1] === undefined ? '*' : arguments[1];

	  return hiddenChar.repeat(str.split('').length);
	}

	exports.default = Prompt;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("readline");

/***/ }
/******/ ]);