const { pool } = require("./database");

async function addStudent(studentID, firstname, lastname, classToAddTo, email) {
  try {
    pool.connect(async function (err, client, done) {
      const sqlText = `INSERT INTO ${classToAddTo} (students) VALUES ('${studentID}')`;
      await client.query(sqlText);

      const sqlText2 = `INSERT INTO "students" (id, firstname, lastname, email) VALUES ($1, $2, $3, $4)`;
      const values = [studentID, firstname, lastname, email];
      await client.query(sqlText2, values);

      if (err) {
        console.log(err);
      }
      done();
    });
  } catch (err) {
    console.log(err);
    await pool.end();
  }
}

module.exports = { addStudent };
// addStudent("666", "Lou", "Siphur", "max_gym", "lousiphur@hel.com");
