const { pool } = require("./database");
const { getAssignmentMarks } = require("./getAssignmentMarks");

const getClassSummary = async (classID) => {
  try {
    const sqlText = `SELECT * FROM "public".${classID} LEFT JOIN "public"."students" ON "public".${classID}."students" = "public"."students"."id"`;
    const classInfo = await pool.query(sqlText);
    let assignmentMarks = {};
    let assignments = [];
    let assignmentAnalysis = [];

    let marksData = await Promise.all(
      classInfo.rows.map(async (entry) => {
        if (entry.assignments && !assignments.includes(entry.assignments)) {
          assignments.push(entry.assignments);
          assignmentMarks[`${entry.assignments}`] = { scores: [], outof: null };

          let marks = await getAssignmentMarks(classID, entry.assignments);
          marks.forEach((datum) => {
            if (datum.score) {
              {
                assignmentMarks[`${entry.assignments}`].scores.push(
                  datum.score
                );
              }
            }
            if (datum.outof) {
              assignmentMarks[`${entry.assignments}`].outof = datum.outof;
            }
          });
        }
        return assignmentMarks;
      })
    ).then((res) => {
      return res;
    });

    // console.log(marksData[0][`${assignments[0]}`]);
    for (let i = 0; i < assignments.length; i++) {
      let assignmentTotal = marksData[i][`${assignments[i]}`].scores.reduce(
        (prev, current) => parseInt(prev) + parseInt(current),
        0
      );
      let assignmentAverage =
        assignmentTotal / marksData[i][`${assignments[i]}`].scores.length;
      let analysis = {
        name: `${assignments[i]}`,
        average: assignmentAverage,
        outof: marksData[i][`${assignments[i]}`].outof,
      };
      assignmentAnalysis.push(analysis);
    }

    return { classInfo: classInfo.rows, marksData: assignmentAnalysis };
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getClassSummary };
// getClassInfo("max_gym");
