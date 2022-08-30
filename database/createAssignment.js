const { client } = require("./database");

async function createAssignment(classID, assignmentName, marksOutOf) {
  await client.connect();
  const assignmentID = `${classID}_${assignmentName}`;
  try {
    const sqlText = `CREATE TABLE IF NOT EXISTS ${assignmentID} (student varchar(100), score numeric,  outof numeric)`;
    await client.query(sqlText);

    const sqlText2 = `INSERT INTO ${classID} (assignments) VALUES ($1)`;
    const values2 = [assignmentName];
    await client.query(sqlText2, values2);

    const sqlText3 = `INSERT INTO ${assignmentID} (outof) VALUES ($1)`;
    const values3 = [marksOutOf];
    await client.query(sqlText3, values3);
  } catch (err) {
    console.log(err);
  }
  client.end();
}
