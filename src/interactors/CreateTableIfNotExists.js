class CreateTableIfNotExists {
  static async perform({ dbClient, tableName }) {
    await dbClient.query(`CREATE TABLE IF NOT EXISTS ${tableName} (
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );`);

    return true;
  }
}

module.exports = CreateTableIfNotExists;
