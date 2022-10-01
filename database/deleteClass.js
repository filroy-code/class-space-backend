const { pool } = require("./database");

const deleteClass = async (classID) => {
  try {
    const sqlText = `DROP TABLE IF EXISTS "public".${classID} CASCADE`;
    await pool.query(sqlText);

    const sqlText2 = `DELETE FROM "public"."classes" WHERE name = $1`;
    const values2 = [classID];
    await pool.query(sqlText2, values2);
    return `successfully deleted ${classID}`;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { deleteClass };
// deleteClass("max_Drama");
