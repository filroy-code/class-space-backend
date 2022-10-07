const { pool } = require("./database");

const getAssignmentMarks = async (classID, assignmentID) => {
  try {
    // adds all students who are in the class to the assignment table of the assignment being graded.
    const assignmentTable = `${classID}_${assignmentID}`;
    const sqlText = `INSERT INTO "public".${assignmentTable} (student) SELECT (students) FROM "public".${classID} WHERE (students) IS NOT NULL ON CONFLICT DO NOTHING`;
    await pool.query(sqlText);

    const sqlText2 = `SELECT * FROM "public".${assignmentTable} LEFT JOIN "public"."students" ON "public".${assignmentTable}."student" = "public"."students"."id" ORDER BY "lastname"`;
    const assignmentInfo = await pool.query(sqlText2);
    return assignmentInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAssignmentMarks };
// getClassInfo("max_gym");
