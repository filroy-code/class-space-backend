const { pool } = require("./database");

async function getClasses(user) {
  try {
    pool.connect(async function (err, client, done) {
      const sqlText = `SELECT * FROM "public"."classes" WHERE "admins" = $1`;
      const values = [user];
      let listOfClasses = await client.query(sqlText, values);
      if (err) {
        console.log(err);
      }
      done();
      return listOfClasses.rows;
    });
  } catch (err) {
    console.log(err);
  }
  await pool.end();
}

// getClasses("max");
