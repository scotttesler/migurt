const expect = require("chai").expect;
const fs = require("fs");
const mkdirp = require("mkdirp");
const sinon = require("sinon");
const CreateDirectoriesIfNotExists = require("../../src/interactors/CreateDirectoriesIfNotExists");
const CreateFiles = require("../../src/interactors/CreateFiles");
const Log = require("logurt");

const subject = CreateFiles.perform;

const dirDown = "down";
const dirUp = "up";
const name = "name";

describe("CreateFiles", () => {
  beforeEach(() => {
    sinon.stub(fs, "writeFileSync");
    sinon.stub(CreateDirectoriesIfNotExists, "perform");
    sinon.stub(Log, "success");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("creates directories if they don't exist", () => {
    subject({ dirDown, dirUp, name });

    sinon.assert.calledOnce(CreateDirectoriesIfNotExists.perform);
  });

  it("synchronously creates the up and down migration files", () => {
    subject({ dirDown, dirUp, name });

    sinon.assert.calledTwice(fs.writeFileSync);
  });

  it("returns an Object containing the up and down migration filenames", async () => {
    const res = await subject({ dirDown, dirUp, name });

    expect(res).to.have.all.keys('filenameUp', 'filenameDown');
  });
});
