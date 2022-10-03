const { pool } = require("./database");

const getClassSummary = async (classID) => {
  try {
    const sqlText = `SELECT * FROM "public".${classID} LEFT JOIN "public"."students" ON "public".${classID}."students" = "public"."students"."id"`;
    const classInfo = await pool.query(sqlText);
    return classInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getClassSummary };
// getClassInfo("max_gym");
