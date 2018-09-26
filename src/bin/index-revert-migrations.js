#!/usr/bin/env node

const _includes = require("lodash/includes");
const program = require("commander");
const Log = require("logurt");
const Revert = require("../interactors/Revert");
const { Pool } = require("pg");
const {
  DATABASE_URL,
  DIRECTORY_DOWN_MIGRATIONS,
  TABLE_NAME_MIGRATIONS
} = require("../helpers/env");

program
  .option(
    "-n, --number <n>",
    "The number of migrations to revert. Enter a number to revert that many migrations from the latest.",
    parseInt
  )
  .parse(process.argv);

async function perform({ numToRevert }) {
  validateInput({ numToRevert });

  const pool = new Pool({ connectionString: DATABASE_URL });
  const dbClient = await pool.connect();

  if (numToRevert > 0) {
    await Revert.perform({
      dbClient,
      downDir: DIRECTORY_DOWN_MIGRATIONS,
      numToRevert,
      tableName: TABLE_NAME_MIGRATIONS
    });
  }

  dbClient.release();
  pool.end();

  return true;
}

function validateInput({ numToRevert }) {
  if (typeof numToRevert === "number") return true;

  Log.error("Please enter an integer for `number`.");
  program.help();
}

perform({ numToRevert: program.number });
