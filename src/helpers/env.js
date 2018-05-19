const _get = require("lodash/get");

const defaultDirMigrationsDown = "./db/migrations/down";
const defaultDirMigrationsUp = "./db/migrations/up";
const defaultDirSeedsDown = "./db/seeds/down";
const defaultDirSeedsUp = "./db/seeds/up";

exports.DATABASE_URL = _get(process.env, "DATABASE_URL");

exports.DIRECTORY_DOWN_MIGRATIONS = _get(
  process.env,
  "DIRECTORY_DOWN_MIGRATIONS",
  defaultDirMigrationsDown
);

exports.DIRECTORY_DOWN_SEEDS = _get(
  process.env,
  "DIRECTORY_DOWN_SEEDS",
  defaultDirSeedsDown
);

exports.DIRECTORY_UP_MIGRATIONS = _get(
  process.env,
  "DIRECTORY_UP_MIGRATIONS",
  defaultDirMigrationsUp
);

exports.DIRECTORY_UP_SEEDS = _get(
  process.env,
  "DIRECTORY_UP_SEEDS",
  defaultDirSeedsUp
);

exports.TABLE_NAME_MIGRATIONS = _get(
  process.env,
  "TABLE_NAME_MIGRATIONS",
  "public.migrations"
);

exports.TABLE_NAME_SEEDS = _get(
  process.env,
  "TABLE_NAME_SEEDS",
  "public.seeds"
);
