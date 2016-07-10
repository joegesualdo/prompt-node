import chalk from 'chalk';
import readline from 'readline';

class Prompt {
  constructor(text = '', {
    // Defaults
    hidden = false,
    required = false,
    validation = (() => true),
  } = {}) {
    // Set instance properties
    this.text = text;
    this.hidden = hidden;
    this.required = required;
    this.validation = validation;
    this.onDone = () => {};
    this.onChange = () => {};
    this.onKeypress = () => {};
    this.onBackspace = () => {};
    this.onValidationError = () => {};
  }

  on(type, fn) {
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

  begin() {
    const instance = this;
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    // Variables
    let answer = '';
    let answerCursorPos = 0;
    const readlineInterface = readline.createInterface({
      input: process.stdin,
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
          process.stdout.write(`${instance.text} ${chalk.blue(convertStringToHidden(answer))}`);
        } else {
          process.stdout.write(`${instance.text} ${chalk.blue(answer)}`);
        }
        process.stdout.cursorTo(instance.text.length + 1 + answerCursorPos);
        instance.onBackspace();
      } else {
        let oldAnswer = answer;
        answer = insert(answer, str, answerCursorPos);
        answerCursorPos++;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (instance.hidden) {
          process.stdout.write(`${instance.text} ${chalk.blue(convertStringToHidden(answer))}`);
        } else {
          process.stdout.write(`${instance.text} ${chalk.blue(answer)}`);
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
      if (!instance.validation(answer) || (instance.required && stringIsEmpty(answer))) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (instance.hidden) {
          process.stdout.write(`${instance.text} ${chalk.blue(convertStringToHidden(answer))}`);
        } else {
          process.stdout.write(`${instance.text} ${chalk.blue(answer)}`);
        }
        process.stdout.cursorTo(instance.text.length + 1 + answerCursorPos);
        instance.onValidationError(answer)
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
    process.stdout.write(`${instance.text} `);
  }
}

function insert(str, what, index) {
  if (str.length === 0) {
    return what;
  }
  return index > 0
    ? str.replace(new RegExp(`.{${index}}`), `\$&${what}`)
    : what + str;
}

function stringIsEmpty(str) {
  return str.split('').every(char => char === ' ');
}

function convertStringToHidden(str, hiddenChar = '*') {
  return hiddenChar.repeat(str.split('').length);
}

export default Prompt;
