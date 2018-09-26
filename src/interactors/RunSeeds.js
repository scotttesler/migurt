const _get = require("lodash/get");
const fs = require("fs");
const path = require("path");
const CreateTableIfNotExists = require("./CreateTableIfNotExists");
const FetchRemainingFilenames = require("./FetchRemainingFilenames");
const Log = require("logurt");
const { getNumberToRun } = require("../helpers/utils");
const { DIRECTORY_UP_SEEDS, TABLE_NAME_SEEDS } = require("../helpers/env");

class RunSeeds {
  static async perform({ dbClient, inputNumber }) {
    try {
      await dbClient.query("BEGIN");
      await CreateTableIfNotExists.perform({
        dbClient,
        tableName: TABLE_NAME_SEEDS
      });

      const remainingFilenames = await FetchRemainingFilenames.perform({
        dbClient,
        directory: DIRECTORY_UP_SEEDS,
        tableName: TABLE_NAME_SEEDS
      });
      const remainingFilenamesSorted = remainingFilenames.sort();
      const numToRun = getNumberToRun({
        userInput: inputNumber,
        remaining: remainingFilenamesSorted.length
      });

      if (numToRun === 0) {
        Log.info("No seeds to run.");

        return true;
      }

      for (var i = 0; i < numToRun; i++) {
        const filename = remainingFilenamesSorted[i];
        const sql = fs.readFileSync(path.join(DIRECTORY_UP_SEEDS, filename), {
          encoding: "utf-8"
        });

        this.runSeed({ dbClient, sql });
        this.recordSeedWasRun({ dbClient, filename });

        Log.info(`Ran seed "${filename}".`);
      }

      await dbClient.query("COMMIT");
      Log.success("Done.");
    } catch (err) {
      Log.error(`ERROR: ${err.message}`);
      Log.warning("Rolling back any database changes.");
      await dbClient.query("ROLLBACK");
    }

    return true;
  }

  static async runSeed({ dbClient, sql }) {
    await dbClient.query(sql);
    return true;
  }

  static async recordSeedWasRun({ dbClient, filename }) {
    await dbClient.query({
      text: `INSERT INTO ${TABLE_NAME_SEEDS} (name) VALUES ($1);`,
      values: [filename]
    });
    return true;
  }
}

module.exports = RunSeeds;
