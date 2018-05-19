const expect = require("chai").expect;
const sinon = require("sinon");
const CreateTableIfNotExists = require("../../src/interactors/CreateTableIfNotExists");

const subject = CreateTableIfNotExists.perform;

const dbClient = { query: () => {} };
const tableName = "migrations";

describe("CreateTableIfNotExists", () => {
  beforeEach(() => {
    const stubQuery = sinon.stub(dbClient, "query");
    stubQuery.resolves(true);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("queries the database", async () => {
    await subject({ dbClient, tableName });

    sinon.assert.calledOnce(dbClient.query);
  });

  it("returns true", async () => {
    const res = await subject({ dbClient, tableName });

    expect(res).to.equal(true);
  });
});
