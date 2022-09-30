const { pool } = require("./database");

const getClassSummary = async (classID) => {
  try {
    const sqlText = `SELECT * FROM "public".${classID} FULL OUTER JOIN "public"."students" ON "public".${classID}."students" = "public"."students"."id" ORDER BY "lastname"`;
    const classInfo = await pool.query(sqlText);
    return classInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getClassSummary };
// getClassInfo("max_gym");
