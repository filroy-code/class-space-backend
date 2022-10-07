const { pool } = require("./database");
const { getAssignmentMarks } = require("./getAssignmentMarks");

const getClassSummary = async (classID) => {
  try {
    const sqlText = `SELECT * FROM "public".${classID} LEFT JOIN "public"."students" ON "public".${classID}."students" = "public"."students"."id"`;
    const classInfo = await pool.query(sqlText);
    // console.log(classInfo.rows);

    let marksData = classInfo.rows.map(async (entry) => {
      let assignmentMarks = [];
      if (entry.assignments) {
        assignmentMarks[`${entry.assignments}`] = [];
        await getAssignmentMarks(classID, entry.assignments).then((res) =>
          res.forEach((datum) => {
            if (datum.score) {
              assignmentMarks[`${entry.assignments}`].push(datum.score);
            }
            // console.log(assignmentMarks[`${entry.assignments}`]);
          })
        );
      }
      return assignmentMarks;
    });

    console.log(marksData);
    return classInfo.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getClassSummary };
// getClassInfo("max_gym");
