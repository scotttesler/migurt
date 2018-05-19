#!/usr/bin/env node

const _includes = require("lodash/includes");
const program = require("commander");
const Log = require("../helpers/Log");
const RunSeeds = require("../interactors/RunSeeds");
const { Pool } = require("pg");
const { DATABASE_URL } = require("../helpers/env");

program
  .option("-n, --number <n>", "The number of seeds to run.", parseInt)
  .parse(process.argv);

async function perform({ inputNumber }) {
  validateInput({ inputNumber });

  const pool = new Pool({ connectionString: DATABASE_URL });
  const dbClient = await pool.connect();

  if (inputNumber > 0) await RunSeeds.perform({ dbClient, inputNumber });

  dbClient.release();
  pool.end();

  return true;
}

function validateInput({ inputNumber }) {
  if (typeof inputNumber === "number") return true;

  Log.error("Please enter an integer for `number`.");
  program.help();
}

perform({ inputNumber: program.number });
