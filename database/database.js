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
    `CREATE TABLE IF NOT EXISTS "students" (id varchar(100) primary key, firstname varchar(100), lastname varchar(100), email varchar(100))`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS "classes" (id serial primary key, name varchar(100), admins varchar(100), icon varchar(100))`
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
