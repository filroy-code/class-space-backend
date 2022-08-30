const { Client } = require("pg");
require("dotenv").config();

const client = new Client(process.env.DATABASE_CONNECTION);

async function connect(client) {
  try {
    await client.connect();
    console.log("Client connected.");

    await createClass("filroy", "Science");
    await client.end();
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}

async function createClass(userID, classname) {
  let classIdentifier = `${userID}_${classname}`;

  try {
    // inserts created class into table of all classes
    const sqlText1 = 'INSERT INTO classes ("name", admins) VALUES ($1, $2)';
    const values = [classIdentifier, userID];
    await client.query(sqlText1, values);

    // creates a table for the new class, including assignmnets and students
    const sqlText2 = `CREATE TABLE ${classIdentifier} (students text, assignments text, admins text)`;
    await client.query(sqlText2);

    // adds the teacher who created the class as an admin in that class
    const sqlText3 = `INSERT INTO ${classIdentifier} (admins) VALUES ('${userID}')`;
    await client.query(sqlText3);
  } catch (err) {
    console.log(err);
  }
}

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

// console.log(process.env.DATABASE_CONNECTION);
connect(client);
