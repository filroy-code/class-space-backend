const { Client } = require("pg");
require("dotenv").config();

const client = new Client(process.env.DATABASE_CONNECTION);

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

// await client.query(
//     `ALTER TABLE ${studentTableName} ADD email varchar(100)`
//   );

async function createUser(username) {
  try {
    const { rows } = await client.query(
      `INSERT INTO users (name) VALUES (${username});`
    );
    console.log(rows);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { client };
