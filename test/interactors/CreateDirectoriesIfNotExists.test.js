const expect = require("chai").expect;
const mkdirp = require("mkdirp");
const sinon = require("sinon");
const CreateDirectoriesIfNotExists = require("../../src/interactors/CreateDirectoriesIfNotExists");

const subject = CreateDirectoriesIfNotExists.perform;

describe("CreateDirectoriesIfNotExists", () => {
  beforeEach(() => {
    sinon.stub(mkdirp, "sync");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("creates directories if they don't exist", () => {
    const dirs = ["a", "b", "c"];
    subject({ dirs });
    sinon.assert.callCount(mkdirp.sync, dirs.length);
  });

  it("returns true", () => {
    const dirs = ["a", "b", "c"];
    const res = subject({ dirs });

    expect(res).to.equal(true);
  });
});
