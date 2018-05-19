const mkdirp = require("mkdirp");

class CreateDirectoriesIfNotExists {
  static perform({ dirs, mode = "0777" }) {
    dirs.forEach(dir => {
      mkdirp.sync(dir, mode);
    });

    return true;
  }
}

module.exports = CreateDirectoriesIfNotExists;
