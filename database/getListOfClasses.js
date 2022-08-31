const { pool } = require("./database");

const getListOfClasses = async (user) => {
  try {
    const sqlText = `SELECT * FROM "public"."classes" WHERE "admins" = $1`;
    const values = [user];
    const listOfClasses = await pool.query(sqlText, values);
    return listOfClasses.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getListOfClasses };
// getListOfClasses("max");
