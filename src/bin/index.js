#!/usr/bin/env node

if (process.env.NODE_ENV !== 'production') require("dotenv").config();

const program = require("commander");

program
  .command("create-migration", "Create new migration and matching reversion files.").alias("cm")
  .command("create-seed", "Create new seed file.").alias("cs")
  .command("migrate", "Run or revert migrations.").alias("m")
  .command("seed", "Run seeds.").alias("s")
  .command("revert-migrations", "Revert migrations.").alias("rm")
  .command("revert-seeds", "Revert seeds.").alias("rs");

program.parse(process.argv);
