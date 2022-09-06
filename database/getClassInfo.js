const { pool } = require("./database");

const getClassInfo = async (classID) => {
  try {
    const sqlText = `SELECT * FROM "public".${classID}`;
    const classInfo = await pool.query(sqlText);
    return classInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getClassInfo };
// getClassInfo("max_gym");
