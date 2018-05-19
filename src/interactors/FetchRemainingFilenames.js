const _difference = require("lodash/difference");
const fs = require("fs");
const path = require("path");
const { alreadyRunFileNames } = require("../helpers/utils");

class FetchRemainingFilenames {
  static async perform({ dbClient, directory, tableName }) {
    const ranFilenames = await alreadyRunFileNames({
      dbClient,
      tableName
    });
    const allFilenames = fs.readdirSync(path.resolve(directory));

    return _difference(allFilenames, ranFilenames).sort();
  }
}

module.exports = FetchRemainingFilenames;
