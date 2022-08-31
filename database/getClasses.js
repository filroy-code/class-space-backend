const { pool } = require("./database");

const getClasses = async (user) => {
  const sqlText = `SELECT * FROM "public"."classes" WHERE "admins" = $1`;
  const values = [user];
  const client = await pool.connect();
  const listOfClasses = await client.query(sqlText, values);
  return listOfClasses.rows;
};

module.exports = { getClasses };
// getClasses("max");
