const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "ytmekuun",
  password: "GzZeZiO-XBy2Uas0IcQAnYxsqRPlOthg",
  host: "heffalump.db.elephantsql.com",
  port: 5432,
  database: "ytmekuun",
});

// async function connect(client) {
//   try {
//     await client.connect();
//     console.log("Client connected.");

//     // await createClass("fillie", "Math");
//     await client.end();
//   } catch (err) {
//     console.log(err);
//   } finally {
//     client.end();
//   }
// }

// async function doThis() {
//   await pool.query(`ALTER TABLE "classes" ADD icon varchar(100)`);
// }

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
// doThis();/
module.exports = { pool };
