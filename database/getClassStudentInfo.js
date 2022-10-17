const { pool } = require("./database");

const getClassStudentInfo = async (classID) => {
  try {
    const sqlText = `SELECT * FROM "public".${classID} INNER JOIN "public"."students" ON "public".${classID}."students" = "public"."students"."id" ORDER BY "lastname"`;
    const classInfo = await pool.query(sqlText);
    return classInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getClassStudentInfo };
// getClassInfo("max_gym");
