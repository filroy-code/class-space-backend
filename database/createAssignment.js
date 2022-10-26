const { pool } = require("./database");

async function createAssignment(classID, assignmentName, marksOutOf) {
  const assignmentID = `${classID}_${assignmentName}`;
  try {
    pool.connect(async function (err, client, done) {
      const sqlText = `CREATE TABLE IF NOT EXISTS "${assignmentID}" (student varchar(100) UNIQUE, score numeric,  outof numeric)`;
      await client.query(sqlText);

      const sqlText2 = `INSERT INTO "public"."${classID}" (assignments) VALUES ($1)`;
      const values2 = [assignmentName];
      await client.query(sqlText2, values2);

      const sqlText3 = `INSERT INTO "public"."${assignmentID}" (outof) VALUES ($1)`;
      const values3 = [marksOutOf];
      await client.query(sqlText3, values3);
      if (err) {
        console.log(err);
      }
      done();
    });
  } catch (err) {
    console.log(err);
    pool.end();
  }
}

module.exports = { createAssignment };
// createAssignment("max_gym", "weight_room", 10);
