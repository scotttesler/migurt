const chalk = require("chalk");
const logSymbols = require("log-symbols");

class Log {
  static error(text) {
    console.log(logSymbols.error, chalk.red(text));
  }

  static info(text) {
    console.log(logSymbols.info, chalk.blue(text));
  }

  static success(text) {
    console.log(logSymbols.success, chalk.green(text));
  }

  static warning(text) {
    console.log(logSymbols.warning, chalk.yellow(text));
  }
}

module.exports = Log;
