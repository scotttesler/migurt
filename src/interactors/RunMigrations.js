const fs = require("fs");
const path = require("path");
const CreateTableIfNotExists = require("./CreateTableIfNotExists");
const FetchRemainingFilenames = require("./FetchRemainingFilenames");
const Log = require("logurt");
const { getNumberToRun } = require("../helpers/utils");
const {
  DIRECTORY_UP_MIGRATIONS,
  TABLE_NAME_MIGRATIONS
} = require("../helpers/env");

class RunMigrations {
  static async perform({ dbClient, inputNumber }) {
    try {
      await dbClient.query("BEGIN");

      await CreateTableIfNotExists.perform({
        dbClient,
        tableName: TABLE_NAME_MIGRATIONS
      });

      const remainingFilenames = await FetchRemainingFilenames.perform({
        dbClient,
        directory: DIRECTORY_UP_MIGRATIONS,
        tableName: TABLE_NAME_MIGRATIONS
      });
      const remainingFilenamesSorted = remainingFilenames.sort();
      const numToRun = getNumberToRun({
        userInput: inputNumber,
        remaining: remainingFilenamesSorted.length
      });

      if (numToRun === 0) {
        Log.info("Nothing to migrate.");

        return true;
      }

      for (var i = 0; i < numToRun; i++) {
        const filename = remainingFilenamesSorted[i];
        const sql = fs.readFileSync(
          path.join(DIRECTORY_UP_MIGRATIONS, filename),
          { encoding: "utf-8" }
        );

        await this.runMigration({
          dbClient,
          filename,
          sql,
          tableName: TABLE_NAME_MIGRATIONS
        });

        Log.info(`Ran migration "${filename}".`);
      }

      await dbClient.query("COMMIT");
      Log.success("Done.");
    } catch (err) {
      Log.error(err.message);
      Log.warning("Rolling back any database changes.");
      await dbClient.query("ROLLBACK");

      return false;
    }

    return true;
  }

  static async runMigration({ dbClient, filename, sql, tableName }) {
    await dbClient.query(sql);
    await dbClient.query({
      text: `INSERT INTO ${tableName} (name) VALUES ($1);`,
      values: [filename]
    });

    return true;
  }
}

module.exports = RunMigrations;
