const { pool } = require("./database");

const getAssignmentInfo = async (classID, assignmentID) => {
  try {
    const assignmentTable = `${classID}_${assignmentID}`;
    const sqlText = `SELECT * FROM "public".${assignmentTable}`;
    const classInfo = await pool.query(sqlText);
    return classInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAssignmentInfo };
// getClassInfo("max_gym");
