const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "ytmekuun",
  password: "GzZeZiO-XBy2Uas0IcQAnYxsqRPlOthg",
  host: "heffalump.db.elephantsql.com",
  port: 5432,
  database: "ytmekuun",
});

async function createDatabase() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS "students" (id serial primary key, firstname varchar(30), lastname varchar(30), email varchar(30), external_id varchar(30))`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS "classes" (id serial primary key, name varchar(50), admins varchar(30), icon varchar(30))`
  );
}

// async function createUser(username) {
//   try {
//     const { rows } = await client.query(
//       `INSERT INTO users (name) VALUES (${username});`
//     );
//     console.log(rows);
//   } catch (err) {
//     console.log(err);
//   }
// }

createDatabase();
module.exports = { pool };
