const _min = require("lodash/min");

exports.alreadyRunFileNames = async function({ dbClient, tableName }) {
  const res = await dbClient.query(`SELECT * FROM ${tableName};`);
  return res.rows.map(row => row["name"]).sort();
};

exports.getNumberToRun = ({ userInput, remaining }) => {
  return _min([parseInt(userInput, 10), remaining]);
};
