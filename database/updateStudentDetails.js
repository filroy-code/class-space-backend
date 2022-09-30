const { pool } = require("./database");

async function updateStudentDetails(studentID, firstname, lastname, email, id) {
  try {
    pool.connect(async function (err, client, done) {
      const sqlText = `UPDATE "students" SET firstname = $1, lastname = $2, email = $3 WHERE id = $4`;
      values = [firstname, lastname, email, id];
      await client.query(sqlText, values);

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

module.exports = { updateStudentDetails };
// addStudent("666", "Lou", "Siphur", "max_gym", "lousiphur@hel.com");
