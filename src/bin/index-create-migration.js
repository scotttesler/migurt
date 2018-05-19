#!/usr/bin/env node

const program = require("commander");
const CreateFiles = require("../interactors/CreateFiles");
const Log = require("../helpers/Log");
const { Pool } = require("pg");
const {
  DIRECTORY_DOWN_MIGRATIONS,
  DIRECTORY_UP_MIGRATIONS
} = require("../helpers/env");

program
  .option(
    "-n, --name <n>",
    'The name of the migration file. Prefixed to the name will be a timestamp. Suffixed to the name will be ".sql".'
  )
  .parse(process.argv);

async function perform({ inputName }) {
  validateInput({ inputName });

  const { filenameUp, filenameDown } = await CreateFiles.perform({
    dirDown: DIRECTORY_DOWN_MIGRATIONS,
    dirUp: DIRECTORY_UP_MIGRATIONS,
    name: inputName
  });

  return true;
}

function validateInput({ inputName }) {
  if (typeof inputName === "string") return true;

  Log.error("Please enter a value for `name`.");
  program.help();
}

perform({ inputName: program.name });
