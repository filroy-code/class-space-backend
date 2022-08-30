const { pool } = require("./database");

async function addStudent(studentID, firstname, lastname, classToAddTo, email) {
  const studentTableName = `student_${studentID}`;
  try {
    pool.connect(async function (err, client, done) {
      const sqlText = `INSERT INTO ${classToAddTo} (students) VALUES ('${studentID}')`;
      await client.query(sqlText);

      const sqlText2 = `CREATE TABLE IF NOT EXISTS ${studentTableName} (id varchar(100) primary key, firstname varchar(100), lastname varchar(100), email varchar(100))`;
      await client.query(sqlText2);

      const sqlText3 = `INSERT INTO ${studentTableName} (id, firstname, lastname, email) VALUES ($1, $2, $3, $4)`;
      const values = [studentID, firstname, lastname, email];
      await client.query(sqlText3, values);
      if (err) {
        console.log(err);
      }
      done();
    });
  } catch (err) {
    console.log(err);
  }
  await pool.end();
}

// addStudent("666", "Lou", "Siphur", "max_gym", "lousiphur@hel.com");
