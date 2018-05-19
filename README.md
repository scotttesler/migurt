# migurt 🍦

_A database migration tool_

[![Build Status](https://travis-ci.org/scotttesler/migurt.svg?branch=master)](https://travis-ci.org/scotttesler/migurt "Build status")
[![Code Climate](https://codeclimate.com/github/scotttesler/migurt/badges/gpa.svg)](https://codeclimate.com/github/scotttesler/migurt)
[![JavaScript Style Guide: Prettier](https://img.shields.io/badge/code%20style-Prettier-ff69b4.svg?style=flat)](https://prettier.io/ "Prettier")
[![Dependencies](https://david-dm.org/scotttesler/migurt.svg)](https://david-dm.org/scotttesler/migurt "Dependencies")

## Installation

`npm i -g migurt` or `yarn global add migurt`

## Usage

#### `migurt help [COMMAND]`

Displays help.

`[COMMAND]` - _Optional_. The name of a command.

---

#### `migurt create-migration --name <NAME>`

Create new migration and matching reversion files.

`<NAME>` - **Required**. The name of the migration file. Prefixed to the name will be a
timestamp. Suffixed to the name will be ".sql".

---

#### `migurt create-seed --name <NAME>`

Create new seed and matching reversion files.

`<NAME>` - **Required**. The name of the seed file. Prefixed to the name will be a timestamp.
Suffixed to the name will be ".sql".

---

#### `migurt migrate --number <NUMBER>`

Run migrations.

`<NUMBER>` - **Required**. The number of migrations to run.

---

#### `migurt seed --number <NUMBER>`

Run seeds.

`<NUMBER>` - **Required**. The number of seeds to run.

---

#### `migurt revert-migrations --number <NUMBER>`

Revert migrations.

`<NUMBER>` - **Required**. The number of migrations to revert. Enter a number to revert that many migrations from the latest.

---

#### `migurt revert-seeds --number <NUMBER>`

Revert seeds.

`<NUMBER>` - **Required**. The number of seeds to revert. Enter a number to revert that many seeds from the latest.

---

## Environment variables

migrt uses [dotenv](https://github.com/motdotla/dotenv) to parse environment
variables from a `.env` file when `process.env.NODE_ENV != 'production'`.

Below are the environment variables and their defaults:

```javascript
DATABASE_URL=
DIRECTORY_DOWN_MIGRATIONS="./db/migrations/down"
DIRECTORY_DOWN_SEEDS="./db/seeds/down"
DIRECTORY_UP_MIGRATIONS="./db/migrations/up"
DIRECTORY_UP_SEEDS="./db/seeds/up"
TABLE_NAME_MIGRATIONS="public.migrations"
TABLE_NAME_SEEDS="public.seeds"
```

## TODO

- [ ] Add MySQL support.

---

Copyright 2018 Scott Tesler

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
