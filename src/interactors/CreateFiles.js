const fs = require("fs");
const CreateDirectoriesIfNotExists = require("./CreateDirectoriesIfNotExists");
const Log = require("../helpers/Log");
const { Pool } = require("pg");

class CreateFiles {
  static async perform({ dirDown, dirUp, name }) {
    CreateDirectoriesIfNotExists.perform({ dirs: [dirUp, dirDown] });

    const filenameUp = `${dirUp}/${Date.now()}_${name}.sql`;
    const filenameDown = `${dirDown}/${Date.now()}_${name}.sql`;

    fs.writeFileSync(filenameUp, "");
    Log.success(`Created file ${filenameUp}`);

    fs.writeFileSync(filenameDown, "");
    Log.success(`Created file ${filenameDown}`);

    return { filenameUp, filenameDown };
  }
}

module.exports = CreateFiles;
