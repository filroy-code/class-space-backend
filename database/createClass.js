const { pool } = require("./database");

async function createClass(userID, classname) {
  let classIdentifier = `${userID}_${classname}`;

  try {
    pool.connect(async function (err, client, done) {
      // inserts created class into table of all classes
      const sqlText1 = 'INSERT INTO classes ("name", admins) VALUES ($1, $2)';
      const values = [classIdentifier, userID];
      await client.query(sqlText1, values);

      // creates a table for the new class, including assignments and students
      const sqlText2 = `CREATE TABLE ${classIdentifier} (students text, assignments text, admins text)`;
      await client.query(sqlText2);

      // adds the teacher who created the class as an admin in that class
      const sqlText3 = `INSERT INTO ${classIdentifier} (admins) VALUES ('${userID}')`;
      await client.query(sqlText3);
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

// createClass("max", "gym");
