# migurt 🍦

_A database migration tool_

### ENV

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

# TODO

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
