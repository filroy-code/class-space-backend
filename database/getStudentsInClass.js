const { pool } = require("./database");

const getStudentsInClass = async (classID) => {
  try {
    // Gets the full data of students in a particular class
    const sqlText = `SELECT * from "public"."students"`;
    const studentInfo = await pool.query(sqlText);
    console.log(studentInfo.rows);
    return studentInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getStudentsInClass };
// getClassInfo("max_gym");
